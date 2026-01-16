"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CONTACT } from "../constants";
import { Navigation, Footer, WhatsAppCard } from "../components";

export default function ChuridharListing() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleWhatsAppClick = (product: any) => {
    const message = `*New Product Inquiry* 🛍️\n\n*Product Name:* ${product.name}\n*Color:* ${product.color}\n*Fabric:* ${product.fabric}\n*Occasion:* ${product.occasion}\n\n*Product Image:* ${product.image}\n\nHi, I'm interested in this product. Can I get more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `${CONTACT.whatsappLink}?text=${encodedMessage}`;
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section for Category */}
      <section className="pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Womens Churidhar Collection
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover our exquisite range of Churidhar materials and sets,
              crafted with premium fabrics and traditional patterns for the
              modern visionary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="border-[1.5px] border-grey-200 rounded-2xl p-2">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                      />
                      {!product.inStock && (
                        <div className="absolute top-4 right-4 bg-white/90 border-[1.5px] border-grey-200 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                          Out of Stock
                        </div>
                      )}
                      <motion.div className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 px-4">
                        <button
                          onClick={() => handleWhatsAppClick(product)}
                          className="w-full bg-white text-black py-3 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          More details
                        </button>
                      </motion.div>
                    </div>

                    <div className="p-2 pt-0 min-h-[95px] lg:min-h-[110px] flex flex-col justify-between">
                      <h3 className="font-serif text-lg font-bold group-hover:text-gray-600 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                            <span>{product.fabric}</span>
                            <span>•</span>
                            <span>{product.occasion}</span>
                            <span>•</span>
                            <span>{product.lengthMeters}m</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{
                                backgroundColor: product.color
                                  .toLowerCase()
                                  .replace(" ", ""),
                              }}
                            />
                            <span className="text-xs text-gray-400">
                              {product.color}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleWhatsAppClick(product)}
                          className="sm:hidden bg-black text-white px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap mt-1 shadow-sm active:scale-95 transition-transform"
                        >
                          More details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="max-w-4xl mx-auto mt-20">
            <WhatsAppCard />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
