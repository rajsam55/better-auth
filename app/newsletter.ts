'use server'

import mailchimp from "@mailchimp/mailchimp_marketing"

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; // your better-auth instance
import { headers } from "next/headers";

type SubscribeResult =
  | { success: true; status: "subscribed" | "pending" }
  | { success: false; error: string };

function hashEmail(email: string) {
  return createHash("md5").update(email.toLowerCase().trim()).digest("hex");
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function subscribeToNewsletter(
  formData: FormData
): Promise<SubscribeResult> {
  // Get email either from the logged-in session or the form (guest signup)
  const session = await auth.api.getSession({ headers: await headers() });
  const email =
    session?.user?.email ?? (formData.get("email") as string | null);

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
  const emailHash = hashEmail(email);

  try {
    // Upsert via PUT — creates the member if absent, updates if present.
    // This avoids the extra GET-then-POST round trip.
    const response = await mailchimp.lists.setListMember(
      audienceId,
      emailHash,
      {
        email_address: email,
        status_if_new: "subscribed", // use "pending" if double opt-in is enabled on your audience
        status: "subscribed",
        merge_fields: session?.user?.name
          ? { FNAME: session.user.name.split(" ")[0] }
          : undefined,
      }
    );

    const mcStatus =
      (response as { status?: string }).status === "pending"
        ? "pending"
        : "subscribed";

    // Keep Prisma in sync if the user is logged in
    
    revalidatePath("/"); // wherever you show subscription state
    return { success: true, status: mcStatus };
  } catch (err: any) {
    // Mailchimp errors come back with a `.response.body` payload
    const detail =
      err?.response?.body?.detail ?? "Something went wrong. Please try again.";
    console.error("Mailchimp subscribe error:", err?.response?.body ?? err);
    return { success: false, error: detail };
  }
}

export async function unsubscribeFromNewsletter(): Promise<SubscribeResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.email) {
    return { success: false, error: "Not signed in" };
  }

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
  const emailHash = hashEmail(session.user.email);

  try {
    await mailchimp.lists.updateListMember(audienceId, emailHash, {
      status: "unsubscribed",
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { newsletterStatus: "unsubscribed", newsletterSyncedAt: new Date() },
    });

    revalidatePath("/account");
    return { success: true, status: "subscribed" }; // status field unused on this branch
  } catch (err: any) {
    const detail = err?.response?.body?.detail ?? "Failed to unsubscribe.";
    console.error("Mailchimp unsubscribe error:", err?.response?.body ?? err);
    return { success: false, error: detail };
  }
}



// if (session?.user?.id) {
//       await prisma.user.update({
//         where: { id: session.user.id },
//         data: {
//           newsletterStatus: mcStatus,
//           newsletterSyncedAt: new Date(),
//         },
//       });
//     }





