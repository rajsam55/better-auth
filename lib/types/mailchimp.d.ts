declare module '@mailchimp/mailchimp_transactional' {
  interface Message {
    from_email: string;
    subject: string;
    html: string;
    to: Array<{
      email: string;
      type?: string;
      name?: string;
    }>;
    text?: string;
    headers?: Record<string, string>;
    important?: boolean;
    track_clicks?: boolean;
    track_opens?: boolean;
    track_text_clicks?: boolean;
    auto_text?: boolean;
    auto_html?: boolean;
    inline_css?: boolean;
    url_strip_qs?: boolean;
    preserve_recipients?: boolean;
    view_content_link?: boolean;
    async?: boolean;
    subaccount?: string;
    google_analytics_campaign?: string;
    google_analytics_domains?: string[];
    google_analytics_ip_anonymize?: boolean;
    tags?: string[];
    send_at?: string;
    metadata?: Record<string, string>;
    attachments?: any[];
    images?: any[];
  }

  interface SendResponse {
    email: string;
    status: string;
    reject_reason: string | null;
    _id: string;
  }

  interface MessagesApi {
    send(params: { message: Message; async?: boolean; ip_pool?: string; send_at?: string }): Promise<SendResponse[]>;
    sendTemplate(params: {
      template_name: string;
      template_content: Array<{ name: string; content: string }>;
      message: Message;
      async?: boolean;
      ip_pool?: string;
      send_at?: string;
    }): Promise<SendResponse[]>;
  }

  interface UsersApi {
    info(): Promise<{
      username: string;
      created_at: string;
      public_api_key: string;
      reputation: number;
      hourly_quota: number;
      backlog: number;
      sends: number;
    }>;
    ping(): Promise<string>;
    ping2(): Promise<string>;
  }

  interface TagsApi {
    list(): Promise<string[]>;
    delete(tag: string): Promise<{ deleted: string }>;
    info(tag: string): Promise<{
      tag: string;
      reputation: number;
      sends: number;
      hard_bounces: number;
      spam_reports: number;
      rejects: number;
      complaints: number;
      unsubs: number;
      recipients: number;
    }>;
  }

  interface RejectsApi {
    add(email: string): Promise<{ email: string; created_at: string }>;
    delete(email: string): Promise<{ deleted: string }>;
    list(email?: string): Promise<Array<{ email: string; reason: string; created_at: string; expires_at: string }>>;
  }

  interface WhitelistApi {
    add(email: string): Promise<{ email: string; created_at: string }>;
    delete(email: string): Promise<{ deleted: string }>;
    list(email?: string): Promise<Array<{ email: string; created_at: string }>>;
  }

  interface TemplatesApi {
    add(name: string, code: string, publish?: boolean): Promise<{
      slug: string;
      name: string;
      code: string;
      publish?: boolean;
      created_at: string;
      updated_at: string;
    }>;
    update(name: string, code: string): Promise<{
      slug: string;
      name: string;
      code: string;
      publish?: boolean;
      created_at: string;
      updated_at: string;
    }>;
    delete(name: string): Promise<{ slug: string; deleted: boolean }>;
    info(name: string, type?: 'user' | 'account'): Promise<{
      slug: string;
      name: string;
      code: string;
      publish?: boolean;
      created_at: string;
      updated_at: string;
    }>;
    list(pattern?: string): Promise<Array<{
      slug: string;
      name: string;
      code: string;
      publish?: boolean;
      created_at: string;
      updated_at: string;
    }>>;
    render(params: {
      template_name: string;
      template_content: Array<{ name: string; content: string }>;
      merge_vars?: Array<{ rcpt: string; vars: Array<{ name: string; content: string }> }>;
    }): Promise<{ html: string; text: string; subject: string }>;
  }

  interface OutboundApi {
    list(params?: { date?: string; hours?: number; limit?: number }): Promise<Array<{
      _id: string;
      from_email: string;
      from_name: string;
      subject: string;
      to: string;
      tags: string[];
      created_at: string;
      opens: number;
      clicks: number;
      state: string;
    }>>;
    sendRaw(params: {
      raw_message: string;
      from_email?: string;
      from_name?: string;
      return_path_domain?: string;
      async?: boolean;
      ip_pool?: string;
      send_at?: string;
    }): Promise<{ _id: string }>;
  }

  interface WebhooksApi {
    add(url: string, events?: { send?: boolean; open?: boolean; click?: boolean; bounce?: boolean; spam?: boolean; unsub?: boolean; delivery?: boolean; injection?: boolean }): Promise<{
      id: number;
      url: string;
      events: { send: boolean; open: boolean; click: boolean; bounce: boolean; spam: boolean; unsub: boolean; delivery: boolean; injection: boolean };
      created_at: string;
      updated_at: string;
      last_sent_at: string | null;
      batches?: number;
      events_sent?: number;
    }>;
    delete(id: number): Promise<{ deleted: boolean }>;
    list(): Promise<Array<{
      id: number;
      url: string;
      events: { send: boolean; open: boolean; click: boolean; bounce: boolean; spam: boolean; unsub: boolean; delivery: boolean; injection: boolean };
      created_at: string;
      updated_at: string;
      last_sent_at: string | null;
      batches?: number;
      events_sent?: number;
    }>>;
    update(id: number, url?: string, events?: { send?: boolean; open?: boolean; click?: boolean; bounce?: boolean; spam?: boolean; unsub?: boolean; delivery?: boolean; injection?: boolean }): Promise<{
      id: number;
      url: string;
      events: { send: boolean; open: boolean; click: boolean; bounce: boolean; spam: boolean; unsub: boolean; delivery: boolean; injection: boolean };
      created_at: string;
      updated_at: string;
      last_sent_at: string | null;
      batches?: number;
      events_sent?: number;
    }>;
  }

  interface IpApi {
    checkIp(ip: string): Promise<{ valid: boolean; error?: string }>;
    listProvisioning(): Promise<string[]>;
    provisionIp(ip: string): Promise<{ ip: string; pool: string; created_at: string }>;
    startWarmup(ip: string): Promise<{ ip: string; warmup_status: string }>;
    cancelWarmup(ip: string): Promise<{ ip: string; warmup_status: string }>;
    info(ip: string): Promise<{
      ip: string;
      pool: string;
      reputation: number;
      warmup_status: string;
      created_at: string;
      warmup_created_at: string | null;
      warmup_successful_at: string | null;
    }>;
    setPool(ip: string, pool: string): Promise<{ ip: string; pool: string }>;
    deleteIp(ip: string): Promise<{ deleted: boolean }>;
    listPools(): Promise<string[]>;
    poolInfo(pool: string): Promise<{
      name: string;
      ips: string[];
      created_at: string;
    }>;
    deletePool(pool: string): Promise<{ deleted: boolean }>;
    createPool(pool: string): Promise<{ name: string; ips: string[]; created_at: string }>;
    listSenders(ip?: string): Promise<Array<{
      address: string;
      created_at: string;
      sent: number;
      hard_bounces: number;
      spam_reports: number;
      rejects: number;
      complaints: number;
      unsubs: number;
      recipients: number;
      negative_reputation: number;
    }>>;
  }

  interface PoolApi {
    list(): Promise<string[]>;
    info(pool: string): Promise<{
      name: string;
      ips: string[];
      created_at: string;
    }>;
    create(pool: string): Promise<{ name: string; ips: string[]; created_at: string }>;
    delete(pool: string): Promise<{ deleted: boolean }>;
    listIps(): Promise<string[]>;
    addIp(pool: string, ip: string): Promise<{ ip: string; pool: string }>;
    deleteIp(pool: string, ip: string): Promise<{ ip: string; deleted: boolean }>;
  }

  interface SubaccountsApi {
    add(id: string, name?: string, notes?: string, custom_quota?: number): Promise<{
      id: string;
      name: string;
      notes: string;
      custom_quota: number;
      status: string;
      reputation: number;
      created_at: string;
      sends_since_creation: number;
    }>;
    info(id: string): Promise<{
      id: string;
      name: string;
      notes: string;
      custom_quota: number;
      status: string;
      reputation: number;
      created_at: string;
      sends_since_creation: number;
    }>;
    update(id: string, params?: { name?: string; notes?: string; custom_quota?: number }): Promise<{
      id: string;
      name: string;
      notes: string;
      custom_quota: number;
      status: string;
      reputation: number;
      created_at: string;
      sends_since_creation: number;
    }>;
    delete(id: string): Promise<{ id: string; deleted: boolean }>;
    list(): Promise<Array<{
      id: string;
      name: string;
      notes: string;
      custom_quota: number;
      status: string;
      reputation: number;
      created_at: string;
      sends_since_creation: number;
    }>>;
    pause(id: string): Promise<{ id: string; status: string }>;
    resume(id: string): Promise<{ id: string; status: string }>;
  }

  interface UrlApi {
    list(options?: { q?: string; sort_by?: string; order?: string }): Promise<Array<{
      url: string;
      sent_to: number;
      clicks: number;
      unique_clicks: number;
    }>>;
    timeSeries(url: string, hours?: number): Promise<Array<{
      url: string;
      sent_to: number;
      clicks: number;
      unique_clicks: number;
      hour: string;
    }>>;
  }

  interface SendersApi {
    domains(): Promise<Array<{
      domain: string;
      created_at: string;
      authenticated: boolean;
      valid_signing_key: boolean;
    }>>;
    list(): Promise<Array<{
      address: string;
      created_at: string;
      sent: number;
      hard_bounces: number;
      spam_reports: number;
      rejects: number;
      complaints: number;
      unsubs: number;
      recipients: number;
      negative_reputation: number;
    }>>;
    info(address: string): Promise<{
      address: string;
      created_at: string;
      sent: number;
      hard_bounces: number;
      spam_reports: number;
      rejects: number;
      complaints: number;
      unsubs: number;
      recipients: number;
      negative_reputation: number;
    }>;
    timeSeries(address: string, hours?: number): Promise<Array<{
      address: string;
      sent: number;
      hard_bounces: number;
      spam_reports: number;
      rejects: number;
      complaints: number;
      unsubs: number;
      recipients: number;
      negative_reputation: number;
      hour: string;
    }>>;
  }

  interface MetadataApi {
    add(key: string, value: string): Promise<{ key: string; value: string }>;
    delete(key: string): Promise<{ deleted: string }>;
    list(): Promise<Record<string, string>>;
    update(key: string, value: string): Promise<{ key: string; value: string }>;
  }

  interface Client {
    messages: MessagesApi;
    users: UsersApi;
    tags: TagsApi;
    rejects: RejectsApi;
    whitelist: WhitelistApi;
    templates: TemplatesApi;
    outbound: OutboundApi;
    webhooks: WebhooksApi;
    ips: IpApi;
    pool: PoolApi;
    subaccounts: SubaccountsApi;
    urls: UrlApi;
    senders: SendersApi;
    metadata: MetadataApi;
  }

  function mailchimpTransactional(apiKey: string): Client;

  export = mailchimpTransactional;
}