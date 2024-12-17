import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { data } from "@/app/api/DummyData/data";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { favoritesArray, handleAddingFavorites } from "@/app/api/AuthApi/api";

const FavoritesSelector = () => {
  const [selected, setSelected] = useState(new Set());
  const [selectedName, setSelectedName] = useState(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const toggleItem = (itemId: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelected(newSelected);
  };
  const toggleItemName = (itemId: string) => {
    const newSelected = new Set(selectedName);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedName(newSelected);
  };

  const handleNext = async () => {
    setIsLoading(true);
    // Handle navigation logic here
    const favorites: favoritesArray[] = Array.from(
      selectedName
    ) as favoritesArray[];
    if (favorites.length > 0) {
      console.log("Selected items:", Array.from(selectedName));
      await handleAddingFavorites(favorites)
        .then((response) => {
          console.log(response.data.message);
          alert(response.data.message);
          router.push("/pages/Extras/FileUpload");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          alert(error.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert("Please select at least one item.");
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Handle skip logic here
    router.push("/pages/Extras/FileUpload");
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Main content area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-rose-600">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
              Select Your Favorites
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Choose as many as you like
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-cyan-300 hover:bg-cyan-900 transition-all duration-200"
              >
                <Checkbox
                  id={idx.toString()}
                  checked={selected.has(idx)}
                  onCheckedChange={() => {
                    toggleItem(idx);
                    toggleItemName(item.name);
                  }}
                  className="h-5 w-5 border-2 data-[state=checked]:border-cyan-500"
                />

                <Label
                  htmlFor={idx.toString()}
                  className="text-base sm:text-lg  font-medium cursor-pointer flex-grow"
                >
                  {item.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed navigation footer */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-sm sm:text-base text-slate-600">
              Selected: {selected.size} items
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-4 sm:px-6"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 sm:px-6"
              >
                {isLoading ? <Spinner color="white" size="sm" /> : <p>Next</p>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesSelector;
