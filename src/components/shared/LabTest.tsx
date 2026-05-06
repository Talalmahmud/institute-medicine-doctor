import { ArrowRight, FlaskConical, Truck } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { allTests } from "@/lib/tests";

const LabTest = () => {
  const showcaseTests = allTests.slice(0, 6);
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Lab Tests</h3>
          <span className="text-xs text-muted-foreground">
            Home collection available (+৳100)
          </span>
        </div>
        <Link
          href="/tests/cbc"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
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
                <div
                  className={`w-9 h-9 rounded-xl ${t.color} flex items-center justify-center shrink-0`}
                >
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <Link
                    href={`/tests/${t.slug}`}
                    className="font-medium text-sm text-foreground leading-tight hover:text-primary transition-colors"
                  >
                    {t.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.category}
                  </p>
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
                  <span className="text-xs text-muted-foreground">
                    +৳{t.collectionFee} collection
                  </span>
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
  );
};

export default LabTest;
