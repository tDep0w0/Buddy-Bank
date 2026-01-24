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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      debt: {
        Row: {
          amount: number
          borrower_id: string
          created_at: string
          group_id: string
          is_paid: boolean
          lender_id: string
        }
        Insert: {
          amount: number
          borrower_id: string
          created_at?: string
          group_id: string
          is_paid?: boolean
          lender_id: string
        }
        Update: {
          amount?: number
          borrower_id?: string
          created_at?: string
          group_id?: string
          is_paid?: boolean
          lender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "debts_borrower_id_fkey"
            columns: ["borrower_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debts_lender_id_fkey"
            columns: ["lender_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      expense: {
        Row: {
          amount: number
          category_id: string
          created_at: string
          description: string
          group_id: string
          id: string
          payer_id: string
          receipt_image_url: string | null
        }
        Insert: {
          amount: number
          category_id?: string
          created_at?: string
          description: string
          group_id?: string
          id?: string
          payer_id: string
          receipt_image_url?: string | null
        }
        Update: {
          amount?: number
          category_id?: string
          created_at?: string
          description?: string
          group_id?: string
          id?: string
          payer_id?: string
          receipt_image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_category: {
        Row: {
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      expense_split: {
        Row: {
          amount: number
          created_at: string
          expense_id: string
          id: string
          receipt_item_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          expense_id?: string
          id?: string
          receipt_item_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          expense_id?: string
          id?: string
          receipt_item_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expense_split_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expense"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_split_receipt_item_id_fkey"
            columns: ["receipt_item_id"]
            isOneToOne: false
            referencedRelation: "receipt_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_splits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      friend: {
        Row: {
          user1_id: string
          user2_id: string
        }
        Insert: {
          user1_id: string
          user2_id: string
        }
        Update: {
          user1_id?: string
          user2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Friends_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Friends_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      friend_request: {
        Row: {
          created_at: string
          is_pending: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          is_pending?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          is_pending?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friend_request_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_request_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      group: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      receipt_item: {
        Row: {
          created_at: string
          expense_id: string
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          expense_id?: string
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          expense_id?: string
          id?: string
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "receipt_items_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expense"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          realname: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          realname: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          realname?: string
          username?: string
        }
        Relationships: []
      }
      user_group: {
        Row: {
          balance: number
          group_id: string
          user_id: string
        }
        Insert: {
          balance?: number
          group_id: string
          user_id: string
        }
        Update: {
          balance?: number
          group_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_group_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "group"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_group_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
