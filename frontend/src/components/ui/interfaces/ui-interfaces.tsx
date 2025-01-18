export type Size = "sm" | "md" | "lg";

export interface CardProps {
  title: string;
  link: string;
  type: 'Other' | 'Tweet' | 'YouTube';
}