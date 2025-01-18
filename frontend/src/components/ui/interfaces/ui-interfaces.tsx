export type Size = "sm" | "md" | "lg";

export interface CardProps {
  title: string;
  link: string;
  type: 'Document' | 'Tweet' | 'YouTube' | 'Link' | 'Social';
}