import { User } from "../types/users.types";

export function exportToCSV(data: User[], filename: string = "data.csv"): void {
    if (!data || data.length === 0) {
      console.error("No data available to export.");
      return;
    }
  
    // Define CSV headers
    const headers = Object.keys(data[0]).join(",");
  
    // Map the data to CSV rows
    const rows = data.map(item =>
      Object.values(item)
        .map(value => (value !== null && value !== undefined ? `"${value}"` : "")) // Wrap values in quotes
        .join(",")
    );
  
    // Combine headers and rows
    const csvContent = [headers, ...rows].join("\n");
  
    // Create a Blob and a link for download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
  
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }