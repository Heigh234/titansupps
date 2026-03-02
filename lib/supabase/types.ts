/**
 * lib/supabase/types.ts
 * ─────────────────────────────────────────────────────────────────
 * Tipos TypeScript del schema de Supabase.
 *
 * EN PRODUCCIÓN: Generar automáticamente con:
 *   npx supabase gen types typescript --project-id TU_PROJECT_ID > lib/supabase/types.ts
 *
 * Este archivo es una representación manual alineada con 001_initial_schema.sql.
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          city: string | null;
          country: string;
          role: 'user' | 'admin';
          segment: 'vip' | 'activo' | 'nuevo' | 'suspendido';
          notes: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: {
          name?: string | null;
          phone?: string | null;
          city?: string | null;
          country?: string;
          role?: 'user' | 'admin';
          segment?: 'vip' | 'activo' | 'nuevo' | 'suspendido';
          notes?: string | null;
          avatar_url?: string | null;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          compare_price: number | null;
          sku: string;
          stock: number;
          category: string;
          status: 'active' | 'low_stock' | 'out_of_stock' | 'draft' | 'archived';
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          options: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['product_variants']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['product_variants']['Insert']>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt: string | null;
          position: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['product_images']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['product_images']['Insert']>;
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          address: string;
          city: string;
          country: string;
          cp: string | null;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['addresses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['addresses']['Insert']>;
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['favorites']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string | null;
          ship_street: string;
          ship_city: string;
          ship_country: string;
          ship_cp: string | null;
          subtotal: number;
          shipping_cost: number;
          discount: number;
          total: number;
          status: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
          payment_method: string;
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          stripe_pi_id: string | null;
          coupon_code: string | null;
          tracking_code: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          name: string;
          variant: string | null;
          price: number;
          quantity: number;
          image_url: string | null;
          slug: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      order_timeline: {
        Row: {
          id: string;
          order_id: string;
          status: string;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_timeline']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          type: 'percent' | 'fixed';
          value: number;
          min_order: number;
          uses: number;
          max_uses: number | null;
          active: boolean;
          expires: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['coupons']['Row'], 'id' | 'uses' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['coupons']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          cover_url: string | null;
          category: string;
          author_name: string;
          author_avatar: string | null;
          content: Json | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          confirmed: boolean;
          source: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          read: boolean;
          replied: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      affiliate_applications: {
        Row: {
          id: string;
          name: string;
          email: string;
          instagram: string | null;
          followers: string | null;
          platform: string | null;
          motivation: string | null;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['affiliate_applications']['Row'], 'id' | 'status' | 'created_at'>;
        Update: Partial<Pick<Database['public']['Tables']['affiliate_applications']['Row'], 'status'>>;
      };
      career_applications: {
        Row: {
          id: string;
          job_id: string;
          job_title: string;
          name: string;
          email: string;
          phone: string | null;
          cv_url: string | null;
          cover_letter: string | null;
          status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'hired';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['career_applications']['Row'], 'id' | 'status' | 'created_at'>;
        Update: Partial<Pick<Database['public']['Tables']['career_applications']['Row'], 'status'>>;
      };
      store_settings: {
        Row: {
          id: number;
          name: string;
          tagline: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          currency: string;
          vat_rate: number;
          support_hours: string;
          notif_new_order: boolean;
          notif_order_shipped: boolean;
          notif_order_cancelled: boolean;
          notif_low_stock: boolean;
          notif_new_user: boolean;
          notif_newsletter_sub: boolean;
          notif_weekly_report: boolean;
          free_shipping_threshold: number;
          standard_days: string;
          express_days: string;
          updated_at: string;
        };
        Insert: never;
        Update: Partial<Omit<Database['public']['Tables']['store_settings']['Row'], 'id'>>;
      };
      shipping_zones: {
        Row: {
          id: string;
          name: string;
          price: number;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shipping_zones']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['shipping_zones']['Insert']>;
      };
    };
  };
};

// ─── Tipos utilitarios de conveniencia ───────────────────────────
export type Profile    = Database['public']['Tables']['profiles']['Row'];
export type Product    = Database['public']['Tables']['products']['Row'];
export type Order      = Database['public']['Tables']['orders']['Row'];
export type OrderItem  = Database['public']['Tables']['order_items']['Row'];
export type Address    = Database['public']['Tables']['addresses']['Row'];
export type Coupon     = Database['public']['Tables']['coupons']['Row'];
export type BlogPost   = Database['public']['Tables']['blog_posts']['Row'];
