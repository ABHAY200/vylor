"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { CHURIDHAR_PRODUCTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navigation, Footer } from "../components";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fabric: "Cotton",
    color: "",
    price: 0,
    lengthMeters: 4,
    occasion: "Casual",
    inStock: true,
    image: "",
  });

  useEffect(() => {
    const savedLogin = localStorage.getItem("admin_is_logged_in");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (!adminPassword) {
      alert("Admin password not set in environment variables (NEXT_PUBLIC_ADMIN_PASSWORD)");
      return;
    }

    if (loginPassword === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("admin_is_logged_in", "true");
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_is_logged_in");
  };

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  }

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        fabric: "Cotton",
        color: "",
        price: 0,
        lengthMeters: 4,
        occasion: "Casual",
        inStock: true,
        image: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : 
               type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size > 500 * 1024) {
      alert("Image size must be less than 500KB");
      e.target.value = ""; // Reset input
      setFile(null);
      return;
    }
    setFile(selectedFile || null);
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Validate file size (500KB)
      if (file.size > 500 * 1024) {
        alert("Image size must be less than 500KB. Please compress your image and try again.");
        return null;
      }

      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = formData.image;
    if (file) {
      const uploadedUrl = await handleImageUpload(file);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const { id, created_at, ...productData } = { ...formData, image: imageUrl } as any;

    if (editingProduct) {
      // If a new file was uploaded, delete the old image from storage if it exists there
      if (file && editingProduct.image && editingProduct.image.includes('product-images')) {
        const urlParts = editingProduct.image.split('product-images/');
        if (urlParts.length > 1) {
          const oldFilePath = urlParts[1].split('?')[0];
          await supabase.storage.from("product-images").remove([oldFilePath]);
        }
      }

      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);
      if (!error) {
        alert("Product updated!");
        fetchProducts();
        handleCloseModal();
      } else {
        alert(error.message);
      }
    } else {
      const { error } = await supabase.from("products").insert([productData]);
      if (!error) {
        alert("Product added!");
        fetchProducts();
        handleCloseModal();
      } else {
        alert(error.message);
      }
    }
    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        // 1. Get the product info before deleting to find the image URL
        const productToDelete = products.find(p => p.id === id);
        
        if (productToDelete && productToDelete.image) {
          // 2. Check if the image is in Supabase storage (contains 'product-images' bucket name)
          if (productToDelete.image.includes('product-images')) {
            // Extract the path after 'product-images/'
            const urlParts = productToDelete.image.split('product-images/');
            if (urlParts.length > 1) {
              const filePath = urlParts[1].split('?')[0]; // Remove any query params
              
              // 3. Delete from storage
              const { error: storageError } = await supabase.storage
                .from("product-images")
                .remove([filePath]);
                
              if (storageError) {
                console.error("Error deleting image from storage:", storageError);
              }
            }
          }
        }

        // 4. Delete the product from the database
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (!error) {
          setProducts(products.filter((p) => p.id !== id));
        } else {
          alert("Error deleting product: " + error.message);
        }
      } catch (err: any) {
        console.error("Delete operation failed:", err);
        alert("An error occurred during deletion.");
      }
    }
  };

  const migrateData = async () => {
    if (confirm("This will import all products from constants. Continue?")) {
      setLoading(true);
      // Remove local IDs so Supabase generates its own
      const productsToMigrate = CHURIDHAR_PRODUCTS.map(({ id, ...rest }) => rest);
      const { error } = await supabase.from("products").insert(productsToMigrate);
      if (error) alert(error.message);
      else {
        alert("Migration complete!");
        fetchProducts();
      }
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <Navigation />
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">Enter your password to manage products</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <input
                required
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={`w-full px-5 py-4 rounded-2xl border ${
                  loginError ? "border-red-500 ring-4 ring-red-50" : "border-gray-200 focus:ring-4 focus:ring-black/5 focus:border-black"
                } outline-none transition-all placeholder:text-gray-300`}
                placeholder="••••••••"
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-2 ml-1 font-medium italic">Incorrect password. Please try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/5"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm sm:text-base text-gray-500">Manage your product catalog</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-none px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all active:scale-95"
            >
              Logout
            </button>
            {products.length === 0 && (
              <button
                onClick={migrateData}
                className="flex-1 sm:flex-none px-4 py-2 border border-black rounded-xl text-sm font-semibold hover:bg-black hover:text-white transition-all active:scale-95"
              >
                Migrate
              </button>
            )}
            <button
              onClick={() => handleOpenModal()}
              className="flex-[2] sm:flex-none bg-black text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
            >
              + Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-sm text-gray-600">Product</th>
                    <th className="px-6 py-4 font-semibold text-sm text-gray-600">Details</th>
                    <th className="px-6 py-4 font-semibold text-sm text-gray-600">Price</th>
                    <th className="px-6 py-4 font-semibold text-sm text-gray-600">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-sm text-gray-900 line-clamp-1">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-gray-500 space-y-0.5">
                          <p className="font-medium text-gray-700">{product.fabric} • {product.occasion}</p>
                          <p>{product.color}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          product.inStock ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 leading-tight line-clamp-2">{product.name}</h3>
                          <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            product.inStock ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                          }`}>
                            {product.inStock ? "In" : "Out"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{product.fabric} • {product.occasion}</p>
                        <p className="text-xs text-gray-400">{product.color}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-gray-900 text-lg">₹{product.price.toLocaleString()}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400">No products found. Start by adding one or migrating data.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-t-[1rem] sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
            >
              <div className="p-6 sm:p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "New Product"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Fill in the details below</p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors sm:hidden"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Product Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="e.g. Cream Floral Bouquet Churidhar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Price (₹)</label>
                    <input
                      required
                      type="number"
                      name="price"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Fabric</label>
                    <input
                      required
                      type="text"
                      name="fabric"
                      placeholder="e.g. Cotton"
                      value={formData.fabric}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Color</label>
                    <input
                      required
                      type="text"
                      name="color"
                      placeholder="e.g. Cream"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Occasion</label>
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all bg-white appearance-none"
                    >
                      <option>Casual</option>
                      <option>Festive</option>
                      <option>Daily Wear</option>
                      <option>Traditional</option>
                      <option>Party Wear</option>
                      <option>Wedding</option>
                      <option>Office Wear</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Product Image</label>
                    <div className="flex flex-col gap-4">
                      {/* Existing Image Preview */}
                      {formData.image && !file && (
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{formData.image}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Current image URL</p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* File Upload Option */}
                        <div className="flex-1">
                          <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl hover:border-black/20 hover:bg-gray-50/50 transition-all cursor-pointer overflow-hidden">
                            {file ? (
                              <div className="text-center p-4">
                                <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{file.name}</p>
                                <p className="text-xs text-gray-500 mt-1">Tap to change</p>
                              </div>
                            ) : (
                              <div className="text-center p-4">
                                <div className="mb-2 flex justify-center">
                                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p className="text-xs font-bold text-gray-700">Upload Image</p>
                                <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-semibold">Max 500KB</p>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </label>
                        </div>

                        {/* URL Option */}
                        <div className="flex flex-col justify-center gap-2 p-4 bg-white border-2 border-gray-100 rounded-2xl">
                          <p className="text-xs font-bold text-gray-700 mb-1">OR Use Image URL</p>
                          <input
                            type="text"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={(e) => {
                              handleInputChange(e);
                              if (e.target.value) setFile(null); // Clear file if URL is provided
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black text-sm transition-all"
                          />
                          <p className="text-[10px] text-gray-400 italic font-medium">Link from external storage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 sm:col-span-2">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="inStock"
                        name="inStock"
                        checked={formData.inStock}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </div>
                    <label htmlFor="inStock" className="text-sm font-bold text-gray-700">Currently in stock</label>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 mb-4 sm:mb-0">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:bg-gray-300 shadow-lg shadow-black/5 flex items-center justify-center gap-2 order-1 sm:order-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>{editingProduct ? "Update Product" : "Save Product"}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-[0.98] order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
