import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, FlaskConical, Store, ArrowRight, Truck, Pill } from "lucide-react";
import { allMedicines } from "@/lib/medicines";
import { allTests } from "@/lib/tests";

const showcaseMedicines = allMedicines.slice(0, 6);
const showcaseTests     = allTests.slice(0, 6);

const products = [
  { name: "MediConnect Pulse Oximeter", category: "Device",     price: 1200 },
  { name: "Digital Thermometer",        category: "Device",     price: 450  },
  { name: "BP Monitor (Wrist)",         category: "Device",     price: 2800 },
  { name: "Multivitamin Gummies",       category: "Supplement", price: 380  },
  { name: "Immunity Booster Pack",      category: "Supplement", price: 750  },
  { name: "First Aid Kit (Basic)",      category: "Safety",     price: 990  },
];

export default function Shop() {
  return (
    <section id="shop" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-sm font-medium text-primary mb-1">One-Stop Store</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Medicines, Tests & More</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Order directly from your prescription or browse our full catalogue.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 gap-1.5">
          View full catalogue <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* ── Medicines ─────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Medicines</h3>
          </div>
          <Link href="/medicines/paracetamol-500mg" className="text-xs text-primary hover:underline flex items-center gap-1">
            Browse all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseMedicines.map((item) => (
            <Card key={item.slug} className="p-4 flex gap-4 items-start hover:shadow-md transition-shadow group">
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                <Pill className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <Link
                    href={`/medicines/${item.slug}`}
                    className="font-semibold text-sm text-foreground leading-tight hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  {item.badge && (
                    <Badge
                      className={`text-xs shrink-0 ${
                        item.badge === "Rx"
                          ? "bg-rose-100 text-rose-700 border-rose-200"
                          : item.badge === "Popular"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item.brand} · {item.packSize}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-foreground">৳{item.price}</span>
                  <div className="flex gap-1.5">
                    <Link href={`/medicines/${item.slug}`}>
                      <Button size="sm" variant="ghost" className="h-7 text-xs px-2">Details</Button>
                    </Link>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                      <ShoppingCart className="w-3 h-3" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Lab Tests ─────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Lab Tests</h3>
            <span className="text-xs text-muted-foreground">Home collection available (+৳100)</span>
          </div>
          <Link href="/tests/cbc" className="text-xs text-primary hover:underline flex items-center gap-1">
            Browse all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseTests.map((t) => (
            <div
              key={t.slug}
              className="bg-white border border-border/60 rounded-2xl p-4 hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl ${t.color} flex items-center justify-center shrink-0`}>
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <Link
                      href={`/tests/${t.slug}`}
                      className="font-medium text-sm text-foreground leading-tight hover:text-primary transition-colors"
                    >
                      {t.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.category}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 bg-muted px-2 py-0.5 rounded-full whitespace-nowrap">
                  {t.turnaround}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">৳{t.price}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Truck className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">+৳{t.collectionFee} collection</span>
                  </div>
                </div>
                <Link href={`/tests/${t.slug}`}>
                  <Button size="sm" className="h-8 text-xs gap-1">
                    Book Test
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Platform products ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Store className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Our Store</h3>
          <span className="text-xs text-muted-foreground">Platform&apos;s own health products</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card key={p.name} className="p-4 hover:shadow-md transition-shadow">
              <div className="w-full h-28 bg-linear-to-br from-primary/10 to-accent/20 rounded-xl mb-3 flex items-center justify-center">
                <Store className="w-8 h-8 text-primary/40" />
              </div>
              <Badge className="bg-muted text-muted-foreground border-0 text-xs mb-2">{p.category}</Badge>
              <h4 className="font-semibold text-sm text-foreground mb-3 leading-tight">{p.name}</h4>
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">৳{p.price}</span>
                <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                  <ShoppingCart className="w-3 h-3" /> Add to cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
