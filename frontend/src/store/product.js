import { create } from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // 'Headers' yerine 'headers' olarak düzeltildi
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        // Eğer response 200 değilse hata mesajını döndür
        return { success: false, message: "Failed to create product" };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "An error occurred while creating the product" };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    set({ products: data.data })
  },
  deleteProduct: async (p_id) => {
    const res = await fetch(`/api/products/${p_id}`, {
      method: "DELETE",
    })

    const data = await res.json()

    if (!data.success) return { success: false, message: data.message }
    set(state => ({ products: state.products.filter(product => product._id != p_id) }))

    return { success: true, message: "Item deleted successfully" }
  },
  updatedProducts: async (pid, updatedProduct) => {
    try {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });
        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Failed to update product" };
        }
        const data = await res.json();
                set(state => ({
            products: state.products.map(product =>
                product._id === pid ? data.data : product
            )
        }));

        return { success: true, message: "Product updated successfully." };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "An error occurred while updating the product." };
    }
}


}))

