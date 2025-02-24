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
    Views: {}
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {}
    CompositeTypes: {}
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"]

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"]
