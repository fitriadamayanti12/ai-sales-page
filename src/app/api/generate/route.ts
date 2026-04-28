// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateSalesPage } from "@/services/groq"

export async function POST(request: NextRequest) {
  try {
    // Cek auth
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse input
    const body = await request.json()
    const { productName, description, features, targetAudience, price, sellingPoints, template } = body

    // Validasi
    if (!productName || !description) {
      return NextResponse.json(
        { error: "Product name and description are required." },
        { status: 400 }
      )
    }

    // Generate dengan Gemini
    const result = await generateSalesPage({
      productName,
      description,
      features,
      targetAudience,
      price,
      sellingPoints,
      template: template || "modern",
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Simpan ke Supabase
    const { data: savedPage, error: saveError } = await supabase
      .from("sales_pages")
      .insert({
        user_id: user.id,
        product_name: productName,
        description: description,
        features: features.split(",").map((f: string) => f.trim()),
        target_audience: targetAudience,
        price: price,
        selling_points: sellingPoints,
        generated_content: result.data,
        template_style: template || "modern",
      })
      .select()
      .single()

    if (saveError) {
      console.error("Save error:", saveError)
      return NextResponse.json(
        { error: "Failed to save to database." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      pageId: savedPage.id,
    })
  } catch (error) {
    console.error("Generate error:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}