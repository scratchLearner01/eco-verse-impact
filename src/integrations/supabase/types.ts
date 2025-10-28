export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      actions: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at: string | null
          id: string
          metadata: Json | null
          points_awarded: number | null
          proof_url: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
        }
        Insert: {
          action_type: Database["public"]["Enums"]["action_type"]
          created_at?: string | null
          id?: string
          metadata?: Json | null
          points_awarded?: number | null
          proof_url?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"]
          created_at?: string | null
          id?: string
          metadata?: Json | null
          points_awarded?: number | null
          proof_url?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          criteria: string | null
          description: string | null
          icon_url: string | null
          id: string
          name: string
          points_required: number | null
        }
        Insert: {
          criteria?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          points_required?: number | null
        }
        Update: {
          criteria?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          points_required?: number | null
        }
        Relationships: []
      }
      devices: {
        Row: {
          device_id: string
          device_type: string
          id: string
          industry_id: string
          last_reading: Json | null
          registered_at: string | null
        }
        Insert: {
          device_id: string
          device_type: string
          id?: string
          industry_id: string
          last_reading?: Json | null
          registered_at?: string | null
        }
        Update: {
          device_id?: string
          device_type?: string
          id?: string
          industry_id?: string
          last_reading?: Json | null
          registered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          aqi: number | null
          avg_eco_points: number | null
          id: string
          name: string
          population: number | null
          state_id: string
        }
        Insert: {
          aqi?: number | null
          avg_eco_points?: number | null
          id?: string
          name: string
          population?: number | null
          state_id: string
        }
        Update: {
          aqi?: number | null
          avg_eco_points?: number | null
          id?: string
          name?: string
          population?: number | null
          state_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "districts_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      industries: {
        Row: {
          company_name: string
          created_at: string | null
          eco_score: number | null
          energy_kwh: number | null
          gst_cin: string | null
          id: string
          location: string
          logo_url: string | null
          monthly_co2_tons: number | null
          renewable_percent: number | null
          sector: Database["public"]["Enums"]["industry_sector"]
          user_id: string
          verified: boolean | null
          waste_recycled_percent: number | null
          water_reuse_percent: number | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          eco_score?: number | null
          energy_kwh?: number | null
          gst_cin?: string | null
          id?: string
          location: string
          logo_url?: string | null
          monthly_co2_tons?: number | null
          renewable_percent?: number | null
          sector: Database["public"]["Enums"]["industry_sector"]
          user_id: string
          verified?: boolean | null
          waste_recycled_percent?: number | null
          water_reuse_percent?: number | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          eco_score?: number | null
          energy_kwh?: number | null
          gst_cin?: string | null
          id?: string
          location?: string
          logo_url?: string | null
          monthly_co2_tons?: number | null
          renewable_percent?: number | null
          sector?: Database["public"]["Enums"]["industry_sector"]
          user_id?: string
          verified?: boolean | null
          waste_recycled_percent?: number | null
          water_reuse_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "industries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_items: {
        Row: {
          category: string
          created_at: string | null
          id: string
          location: string
          price_per_kg: number
          seller_id: string
          stock_kg: number
          title: string
          verified_seller: boolean | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          location: string
          price_per_kg: number
          seller_id: string
          stock_kg: number
          title: string
          verified_seller?: boolean | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          location?: string
          price_per_kg?: number
          seller_id?: string
          stock_kg?: number
          title?: string
          verified_seller?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      national_stats: {
        Row: {
          co2_saved_kg: number | null
          id: string
          recycled_plastics_kg: number | null
          trees_planted: number | null
          updated_at: string | null
          week_start: string
        }
        Insert: {
          co2_saved_kg?: number | null
          id?: string
          recycled_plastics_kg?: number | null
          trees_planted?: number | null
          updated_at?: string | null
          week_start: string
        }
        Update: {
          co2_saved_kg?: number | null
          id?: string
          recycled_plastics_kg?: number | null
          trees_planted?: number | null
          updated_at?: string | null
          week_start?: string
        }
        Relationships: []
      }
      states: {
        Row: {
          aqi: number | null
          avg_eco_points: number | null
          id: string
          name: string
          population: number | null
          trees_per_sqkm: number | null
          updated_at: string | null
          water_purity_index: number | null
        }
        Insert: {
          aqi?: number | null
          avg_eco_points?: number | null
          id?: string
          name: string
          population?: number | null
          trees_per_sqkm?: number | null
          updated_at?: string | null
          water_purity_index?: number | null
        }
        Update: {
          aqi?: number | null
          avg_eco_points?: number | null
          id?: string
          name?: string
          population?: number | null
          trees_per_sqkm?: number | null
          updated_at?: string | null
          water_purity_index?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          buyer_id: string
          buyer_points_awarded: number | null
          created_at: string | null
          id: string
          item_id: string
          quantity_kg: number
          seller_id: string
          seller_points_awarded: number | null
          total_amount: number
        }
        Insert: {
          buyer_id: string
          buyer_points_awarded?: number | null
          created_at?: string | null
          id?: string
          item_id: string
          quantity_kg: number
          seller_id: string
          seller_points_awarded?: number | null
          total_amount: number
        }
        Update: {
          buyer_id?: string
          buyer_points_awarded?: number | null
          created_at?: string | null
          id?: string
          item_id?: string
          quantity_kg?: number
          seller_id?: string
          seller_points_awarded?: number | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          city: string
          created_at: string | null
          eco_points: number | null
          email: string
          full_name: string
          has_solar: boolean | null
          id: string
          monthly_electricity: number | null
          phone: string | null
          state: string
          trust_score: number | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
          vehicle_type: string | null
        }
        Insert: {
          avatar_url?: string | null
          city: string
          created_at?: string | null
          eco_points?: number | null
          email: string
          full_name: string
          has_solar?: boolean | null
          id: string
          monthly_electricity?: number | null
          phone?: string | null
          state: string
          trust_score?: number | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          vehicle_type?: string | null
        }
        Update: {
          avatar_url?: string | null
          city?: string
          created_at?: string | null
          eco_points?: number | null
          email?: string
          full_name?: string
          has_solar?: boolean | null
          id?: string
          monthly_electricity?: number | null
          phone?: string | null
          state?: string
          trust_score?: number | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
      verifications: {
        Row: {
          action_id: string | null
          confidence_score: number | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["verification_status"]
          verified_at: string | null
          verifier_id: string | null
        }
        Insert: {
          action_id?: string | null
          confidence_score?: number | null
          id?: string
          notes?: string | null
          status: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verifier_id?: string | null
        }
        Update: {
          action_id?: string | null
          confidence_score?: number | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["verification_status"]
          verified_at?: string | null
          verifier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verifications_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_verifier_id_fkey"
            columns: ["verifier_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      action_type:
        | "smart_bin"
        | "tree_plant"
        | "public_transport"
        | "donation"
        | "industry_report"
        | "solar_install"
        | "ev_purchase"
      industry_sector:
        | "manufacturing"
        | "energy"
        | "construction"
        | "agriculture"
        | "services"
        | "technology"
        | "other"
      user_type: "individual" | "industry"
      verification_status:
        | "pending"
        | "auto_verified"
        | "manual_verified"
        | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      action_type: [
        "smart_bin",
        "tree_plant",
        "public_transport",
        "donation",
        "industry_report",
        "solar_install",
        "ev_purchase",
      ],
      industry_sector: [
        "manufacturing",
        "energy",
        "construction",
        "agriculture",
        "services",
        "technology",
        "other",
      ],
      user_type: ["individual", "industry"],
      verification_status: [
        "pending",
        "auto_verified",
        "manual_verified",
        "rejected",
      ],
    },
  },
} as const
