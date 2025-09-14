"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { typography } from "@/lib/design-system"

type TitleLevel = "h1" | "h2" | "h3"
type TitleVariant = "default"

export interface TitleProps {
  as?: TitleLevel
  text?: string
  className?: string
  align?: "left" | "center" | "right"
  color?: "brand" | "white"
  margin?: "none" | "sm" | "md" | "lg" | "xl"
  variant?: TitleVariant
  children?: React.ReactNode
}

const levelToClassDefault: Record<TitleLevel, string> = {
  h1: typography.title,
  h2: typography.sectionTitleLg,
  h3: typography.sectionTitleSm,
}

const defaultMarginForLevel: Record<TitleLevel, string> = {
  h1: "mb-6",
  h2: "mb-6",
  h3: "mb-4"
}

const marginMap: Record<NonNullable<TitleProps["margin"]>, string> = {
  none: "mb-0",
  sm: "mb-4",
  md: "mb-6",
  lg: "mb-8",
  xl: "mb-12",
}

const colorMap: Record<NonNullable<TitleProps["color"]>, string> = {
  brand: "text-brand-black",
  white: "text-white",
}

export function Title({ as = "h1", text, className, align = "left", color = "brand", margin, variant = "default", children }: TitleProps) {
  const Tag = as as keyof JSX.IntrinsicElements
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
  const colorClass = colorMap[color]
  const marginClass = margin ? marginMap[margin] : defaultMarginForLevel[as]
  const levelClass = levelToClassDefault[as]
  const classes = cn(levelClass, colorClass, marginClass, alignClass, className)

  return <Tag className={classes}>{children ?? text}</Tag>
}
