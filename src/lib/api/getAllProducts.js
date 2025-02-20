export async function getAllProducts() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
  
      return res.json(); // Return the parsed JSON
    } catch (error) {
      console.error("Error fetching products:", error);
      return { products: [] }; // Return empty array in case of error
    }
  }
  