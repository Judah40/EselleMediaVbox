import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Check } from "lucide-react";
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
    const favorites: favoritesArray[] = Array.from(
      selectedName
    ) as favoritesArray[];
    if (favorites.length > 0) {
      await handleAddingFavorites(favorites)
        .then((response) => {
          alert(response.data.message);
          router.push("/pages/Extras/FileUpload");
        })
        .catch((error) => {
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
    router.push("/pages/Extras/FileUpload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with enhanced styling */}
          <header className="mb-8 sm:mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg shadow-rose-500/30 mb-6 animate-bounce">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent mb-3">
              Choose Your Favorites
            </h1>
            <p className="text-slate-400 text-base sm:text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Select the items you love most
              <Sparkles className="w-4 h-4 text-rose-400" />
            </p>
          </header>

          {/* Selection counter badge */}
          {selected.size > 0 && (
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-full shadow-lg border-2 border-cyan-500/20 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-slate-200">
                  {selected.size} {selected.size === 1 ? "item" : "items"}{" "}
                  selected
                </span>
              </div>
            </div>
          )}

          {/* Grid of items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {data.map((item, idx) => {
              const isSelected = selected.has(idx);
              return (
                <div
                  key={idx}
                  className={`group relative transition-all duration-300 transform hover:scale-105 ${
                    isSelected ? "scale-105" : ""
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div
                    className={`relative flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-cyan-500 bg-gradient-to-br from-cyan-950 to-cyan-900/50 shadow-xl shadow-cyan-500/20"
                        : "border-slate-700 bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:bg-slate-800/80"
                    }`}
                    onClick={() => {
                      toggleItem(idx);
                      toggleItemName(item.name);
                    }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <Checkbox
                      id={idx.toString()}
                      checked={isSelected}
                      onCheckedChange={() => {
                        toggleItem(idx);
                        toggleItemName(item.name);
                      }}
                      className="h-6 w-6 border-2 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 transition-all"
                    />

                    <Label
                      htmlFor={idx.toString()}
                      className={`text-base sm:text-lg font-medium cursor-pointer flex-grow transition-colors ${
                        isSelected
                          ? "text-cyan-100"
                          : "text-slate-300 group-hover:text-cyan-300"
                      }`}
                    >
                      {item.name}
                    </Label>

                    {/* Hover heart indicator */}
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isSelected
                          ? "text-rose-400 fill-rose-400 scale-110"
                          : "text-slate-600 group-hover:text-rose-400 group-hover:scale-110"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced fixed navigation footer */}
      <div className="sticky bottom-0 border-t border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 sm:py-6">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-300">
                  {selected.size === 0
                    ? "No items selected"
                    : `${selected.size} selected`}
                </span>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-6 py-6 rounded-xl border-2 border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-700 hover:text-slate-100 transition-all font-medium"
              >
                Skip for now
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="px-8 py-6 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  <span className="flex items-center gap-2">
                    Continue
                    <Check className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesSelector;
