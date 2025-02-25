export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      trips: {
        Row: {
          id: string
          user_id: string | null
          destination: string
          budget: "Budget" | "Mid-range" | "Luxury"
          duration: number
          created_at: string
          description: string | null
          group_size: "Solo" | "Couple" | "Small Group" | "Large Group"
          adventure: boolean
          luxury: boolean
          nature: boolean
          content_json: Json | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          destination: string
          budget: "Budget" | "Mid-range" | "Luxury"
          duration: number
          created_at?: string
          description?: string | null
          group_size: "Solo" | "Couple" | "Small Group" | "Large Group"
          adventure?: boolean
          luxury?: boolean
          nature?: boolean
          content_json?: Json | null
        }
        Update: {
          id?: string
          user_id?: string | null
          destination?: string
          budget?: "Budget" | "Mid-range" | "Luxury"
          duration?: number
          created_at?: string
          description?: string | null
          group_size?: "Solo" | "Couple" | "Small Group" | "Large Group"
          adventure?: boolean
          luxury?: boolean
          nature?: boolean
          content_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_plans: {
        Row: {
          id: string
          trip_id: string
          itinerary: Json[]
          activities: Json[]
          budget_breakdown: {
            flights: number
            accommodation: number
            food: number
            activities: number
          }
          created_at: string
        }
        Insert: {
          id?: string
          trip_id: string
          itinerary: Json[]
          activities: Json[]
          budget_breakdown: {
            flights: number
            accommodation: number
            food: number
            activities: number
          }
          created_at?: string
        }
        Update: {
          id?: string
          trip_id?: string
          itinerary?: Json[]
          activities?: Json[]
          budget_breakdown?: {
            flights: number
            accommodation: number
            food: number
            activities: number
          }
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_plans_trip_id_fkey"
            columns: ["trip_id"]
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
