// src/app/api/download/[id]/route.ts
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: page, error } = await supabase
    .from("sales_pages")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 })
  }

  const content = page.generated_content
  const isLuxury = page.template_style === "luxury"
  const isMinimal = page.template_style === "minimal"

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.product_name} — Sales Page</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* ========== RESET & BASE ========== */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
      ${isLuxury 
        ? `background: linear-gradient(160deg, #0a0a0f 0%, #12121a 30%, #0d0d15 60%, #0a0a0f 100%); color: #f1f5f9;` 
        : isMinimal 
        ? `background: #ffffff; color: #0f172a;` 
        : `background: linear-gradient(160deg, #f8fafc 0%, #f1f5f9 25%, #faf5ff 50%, #fef2f2 75%, #f8fafc 100%); color: #0f172a;`
      }
    }
    
    html { scroll-behavior: smooth; }
    
    .container { 
      max-width: 1100px; 
      margin: 0 auto; 
      padding: 0 32px; 
    }
    
    /* ========== TYPOGRAPHY ========== */
    h1, h2, h3, h4 { 
      line-height: 1.2; 
      letter-spacing: -0.02em;
    }
    
    p { margin-bottom: 1rem; }
    
    /* ========== HERO ========== */
    .hero { 
      text-align: center; 
      padding: 100px 0 70px; 
    }
    
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 28px;
      letter-spacing: 0.01em;
      ${isLuxury 
        ? 'background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2);' 
        : 'background: #fef3c7; color: #92400e; border: 1px solid #fde68a;'
      }
    }
    
    .headline { 
      font-size: clamp(2.5rem, 6vw, 4.5rem); 
      font-weight: 900; 
      line-height: 1.08; 
      margin-bottom: 22px;
      letter-spacing: -0.03em;
      ${isLuxury 
        ? "font-family: 'Playfair Display', serif; color: #fbbf24;" 
        : "color: #0f172a;"
      }
    }
    
    .headline-gradient {
      background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subheadline { 
      font-size: 1.2rem; 
      max-width: 650px; 
      margin: 0 auto 36px; 
      font-weight: 400;
      line-height: 1.7;
      ${isLuxury ? 'color: #cbd5e1;' : 'color: #475569;'}
    }
    
    /* ========== BUTTONS ========== */
    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: #0f172a;
      font-weight: 700;
      font-size: 1.05rem;
      padding: 16px 36px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 8px 28px rgba(251, 191, 36, 0.25);
      text-decoration: none;
    }
    
    .cta-button:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 14px 40px rgba(251, 191, 36, 0.35); 
    }
    
    .cta-button-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 1rem;
      padding: 14px 32px;
      border-radius: 14px;
      text-decoration: none;
      transition: all 0.25s ease;
      ${isLuxury 
        ? 'background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.15);' 
        : 'background: #fff; color: #0f172a; border: 1px solid #e2e8f0;'
      }
    }
    
    .cta-button-secondary:hover {
      ${isLuxury 
        ? 'background: rgba(255,255,255,0.1);' 
        : 'background: #f8fafc; border-color: #cbd5e1;'
      }
    }
    
    /* ========== SECTIONS ========== */
    .section {
      padding: 70px 0;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }
    
    .section-label {
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
      ${isLuxury ? 'color: #fbbf24;' : 'color: #f59e0b;'}
    }
    
    .section-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      ${isLuxury ? 'color: #fff;' : 'color: #0f172a;'}
    }
    
    .section-subtitle {
      font-size: 1.05rem;
      max-width: 550px;
      margin: 12px auto 0;
      line-height: 1.6;
      ${isLuxury ? 'color: #94a3b8;' : 'color: #64748b;'}
    }
    
    /* ========== BENEFITS CARDS ========== */
    .benefits-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 22px; 
    }
    
    .benefit-card {
      padding: 36px 32px;
      border-radius: 20px;
      transition: all 0.3s ease;
      ${isLuxury 
        ? `background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(10px);` 
        : isMinimal 
        ? `background: #f8fafc; border: 1px solid #e2e8f0;` 
        : `background: #fff; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04);`
      }
    }
    
    .benefit-card:hover {
      transform: translateY(-4px);
      ${isLuxury 
        ? 'border-color: rgba(251,191,36,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.3);' 
        : 'border-color: #fbbf24; box-shadow: 0 12px 40px rgba(0,0,0,0.06);'
      }
    }
    
    .benefit-icon { 
      width: 52px; 
      height: 52px; 
      border-radius: 14px; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      margin-bottom: 20px;
      font-size: 1.5rem;
      font-weight: 700;
      ${isLuxury ? 'background: rgba(251,191,36,0.15); color: #fbbf24;' : 'background: #fef3c7; color: #92400e;'}
    }
    
    .benefit-title { 
      font-size: 1.15rem; 
      font-weight: 700; 
      margin-bottom: 10px;
      line-height: 1.3;
      ${isLuxury ? 'color: #f8fafc;' : 'color: #0f172a;'}
    }
    
    .benefit-desc { 
      font-size: 0.95rem; 
      line-height: 1.65;
      margin-bottom: 0;
      ${isLuxury ? 'color: #94a3b8;' : 'color: #475569;'}
    }
    
    /* ========== FEATURES ========== */
    .features-section {
      padding: 70px 0;
      border-radius: 24px;
      margin: 20px 0;
      ${isLuxury 
        ? 'background: rgba(255,255,255,0.02);' 
        : isMinimal 
        ? 'background: #f8fafc;' 
        : 'background: #fff; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04);'
      }
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 28px;
      padding: 0 32px;
    }
    
    .feature-item { 
      text-align: center; 
      padding: 10px;
    }
    
    .feature-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      ${isLuxury 
        ? 'background: rgba(251,191,36,0.12); color: #fbbf24;' 
        : 'background: #fef3c7; color: #f59e0b;'
      }
    }
    
    .feature-name { 
      font-weight: 700; 
      font-size: 1rem;
      margin-bottom: 6px;
      line-height: 1.3;
      ${isLuxury ? 'color: #f1f5f9;' : 'color: #0f172a;'}
    }
    
    .feature-detail { 
      font-size: 0.88rem; 
      line-height: 1.55;
      margin-bottom: 0;
      ${isLuxury ? 'color: #94a3b8;' : 'color: #64748b;'}
    }
    
    /* ========== TESTIMONIAL ========== */
    .testimonial {
      text-align: center;
      padding: 56px 48px;
      margin: 30px 0;
      border-radius: 24px;
      ${isLuxury 
        ? `background: linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,191,36,0.02)); border: 1px solid rgba(251,191,36,0.12);` 
        : `background: linear-gradient(135deg, #fef9c3, #fef3c7); border: 1px solid #fde68a;`
      }
    }
    
    .stars { 
      font-size: 1.3rem; 
      letter-spacing: 4px;
      margin-bottom: 20px; 
      color: #fbbf24; 
    }
    
    .quote { 
      font-size: 1.15rem; 
      font-style: italic; 
      margin-bottom: 20px; 
      font-weight: 400;
      line-height: 1.7;
      max-width: 650px;
      margin-left: auto;
      margin-right: auto;
      ${isLuxury ? 'color: #e2e8f0;' : 'color: #334155;'}
    }
    
    .author { 
      font-weight: 700;
      font-size: 1rem;
      ${isLuxury ? 'color: #fff;' : 'color: #0f172a;'}
    }
    
    .author-role { 
      font-size: 0.85rem; 
      margin-top: 4px;
      ${isLuxury ? 'color: #94a3b8;' : 'color: #64748b;'}
    }
    
    /* ========== PRICING ========== */
    .pricing-section {
      text-align: center;
      padding: 56px 48px;
      margin: 30px 0;
      border-radius: 24px;
      ${isLuxury 
        ? `background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);` 
        : isMinimal 
        ? `background: #f8fafc; border: 1px solid #e2e8f0;` 
        : `background: #fff; border: 2px solid #fbbf24; box-shadow: 0 8px 40px rgba(251,191,36,0.08);`
      }
    }
    
    .price { 
      font-size: 3.5rem; 
      font-weight: 900; 
      margin-bottom: 8px;
      line-height: 1;
      letter-spacing: -0.03em;
      ${isLuxury ? 'color: #fbbf24;' : 'color: #0f172a;'}
    }
    
    .billing { 
      font-size: 1rem; 
      margin-bottom: 8px;
      font-weight: 500;
      ${isLuxury ? 'color: #cbd5e1;' : 'color: #64748b;'}
    }
    
    .guarantee { 
      font-size: 0.9rem; 
      font-weight: 600;
      margin-bottom: 28px;
      ${isLuxury ? 'color: #4ade80;' : 'color: #16a34a;'}
    }
    
    /* ========== FOOTER CTA ========== */
    .footer-cta { 
      text-align: center; 
      padding: 60px 0 40px; 
    }
    
    .footer-cta-text {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 28px;
      ${isLuxury ? 'color: #f1f5f9;' : 'color: #0f172a;'}
    }
    
    /* ========== FOOTER ========== */
    footer { 
      text-align: center; 
      padding: 40px 0; 
      font-size: 0.82rem; 
      font-weight: 400;
      ${isLuxury ? 'color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);' : 'color: #94a3b8; border-top: 1px solid #e2e8f0;'}
    }
    
    /* ========== RESPONSIVE ========== */
    @media (max-width: 768px) {
      .container { padding: 0 20px; }
      .hero { padding: 60px 0 40px; }
      .headline { font-size: 2.2rem; }
      .subheadline { font-size: 1rem; }
      .benefits-grid { grid-template-columns: 1fr; gap: 16px; }
      .features-grid { grid-template-columns: 1fr 1fr; gap: 20px; padding: 0 16px; }
      .benefit-card { padding: 28px 24px; }
      .testimonial, .pricing-section { padding: 40px 24px; }
      .section { padding: 50px 0; }
      .features-section { padding: 50px 16px; }
    }
    
    @media (max-width: 480px) {
      .features-grid { grid-template-columns: 1fr; }
      .cta-button { padding: 14px 28px; font-size: 0.95rem; width: 100%; text-align: center; }
      .price { font-size: 2.5rem; }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- ===== HERO ===== -->
    <section class="hero">
      <div class="hero-badge">✨ AI-Generated Sales Page</div>
      <h1 class="headline">
        ${isLuxury ? content.headline : `<span class="headline-gradient">${content.headline}</span>`}
      </h1>
      <p class="subheadline">${content.subheadline}</p>
      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="#" class="cta-button">${content.heroCta} →</a>
        <a href="#" class="cta-button-secondary">Learn More</a>
      </div>
    </section>

    <!-- ===== BENEFITS ===== -->
    <section class="section">
      <div class="section-header">
        <p class="section-label">Why Choose Us</p>
        <h2 class="section-title">Designed for Results</h2>
        <p class="section-subtitle">Everything you need to succeed, delivered in a beautiful package.</p>
      </div>
      <div class="benefits-grid">
        ${(content.benefits || []).map((b: any) => `
          <div class="benefit-card">
            <div class="benefit-icon">✦</div>
            <h3 class="benefit-title">${b.title}</h3>
            <p class="benefit-desc">${b.description}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- ===== FEATURES ===== -->
    <section class="features-section">
      <div class="section-header">
        <p class="section-label">Features</p>
        <h2 class="section-title">Everything You Need</h2>
        <p class="section-subtitle">Powerful features designed to help you succeed faster.</p>
      </div>
      <div class="features-grid">
        ${(content.features || []).map((f: any) => `
          <div class="feature-item">
            <div class="feature-icon">◆</div>
            <p class="feature-name">${f.name}</p>
            <p class="feature-detail">${f.detail}</p>
          </div>
        `).join("")}
      </div>
    </section>

    ${content.socialProof ? `
    <!-- ===== TESTIMONIAL ===== -->
    <section class="testimonial">
      <p class="section-label" style="text-align:center;">Testimonial</p>
      <div class="stars">★★★★★</div>
      <p class="quote">"${content.socialProof.quote}"</p>
      <p class="author">${content.socialProof.author}</p>
      <p class="author-role">${content.socialProof.role}</p>
    </section>
    ` : ""}

    ${content.pricing ? `
    <!-- ===== PRICING ===== -->
    <section class="pricing-section">
      <p class="section-label">Pricing</p>
      <h2 class="section-title" style="margin-bottom:24px;">Simple & Transparent</h2>
      <p class="price">${content.pricing.price}</p>
      <p class="billing">${content.pricing.billing}</p>
      <p class="guarantee">✅ ${content.pricing.guarantee}</p>
      <a href="#" class="cta-button">${content.finalCta || "Get Started Now"} →</a>
    </section>
    ` : ""}

    <!-- ===== FINAL CTA ===== -->
    <section class="footer-cta">
      <p class="footer-cta-text">Ready to get started?</p>
      <a href="#" class="cta-button">${content.finalCta || "Get Started Now"} →</a>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer>
      <p>© 2026 ${page.product_name}. All rights reserved.</p>
      <p style="margin-top:6px;">Generated by AI Sales Page Generator</p>
    </footer>

  </div>
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `attachment; filename="${page.product_name.toLowerCase().replace(/\s+/g, '-')}-sales-page.html"`,
    },
  })
}