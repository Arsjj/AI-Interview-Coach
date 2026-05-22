CREATE TYPE "public"."interview_level" AS ENUM('junior', 'middle', 'senior');--> statement-breakpoint
CREATE TYPE "public"."interview_mode" AS ENUM('practice', 'mock', 'deep-dive');--> statement-breakpoint
CREATE TYPE "public"."interview_status" AS ENUM('active', 'completed');--> statement-breakpoint
CREATE TABLE "interview_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"score" integer NOT NULL,
	"strengths" jsonb NOT NULL,
	"weaknesses" jsonb NOT NULL,
	"senior_answer" text NOT NULL,
	"follow_up_question" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"topic" text NOT NULL,
	"level" "interview_level" NOT NULL,
	"mode" "interview_mode" NOT NULL,
	"status" "interview_status" DEFAULT 'active' NOT NULL,
	"average_score" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interview_answers" ADD CONSTRAINT "interview_answers_session_id_interview_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."interview_sessions"("id") ON DELETE cascade ON UPDATE no action;