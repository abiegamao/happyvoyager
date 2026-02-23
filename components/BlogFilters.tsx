"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, ChevronDown, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface BlogFiltersProps {
    categories: string[];
}

export default function BlogFilters({ categories }: BlogFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentCategory = searchParams.get("category") || "all";
    const currentSearch = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(currentSearch);

    // Update local search query if URL changes
    useEffect(() => {
        setSearchQuery(currentSearch);
    }, [currentSearch]);

    const updateFilters = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "all" || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        // Reset to page 1 on filter change
        params.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ search: searchQuery });
    };

    const clearSearch = () => {
        setSearchQuery("");
        updateFilters({ search: null });
    };

    return (
        <div className="container mx-auto px-6 max-w-7xl mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-end md:items-center justify-between bg-transparent">
                {/* Search Input */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="relative w-full md:max-w-md group"
                >
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Search className={cn(
                            "w-5 h-5 transition-colors",
                            isPending ? "text-[var(--color-primary)] animate-pulse" : "text-[var(--color-muted-foreground)] group-focus-within:text-[var(--color-primary)]"
                        )} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search stories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-[var(--color-secondary)]/30 border-transparent focus:bg-white focus:border-[var(--color-primary)]/30 focus:ring-4 focus:ring-[var(--color-primary)]/5 rounded-2xl transition-all outline-none text-[var(--color-charcoal)] placeholder:text-[var(--color-muted-foreground)]/60"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-4 flex items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-charcoal)] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </form>

                {/* Category Filter Dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-medium text-sm group",
                                    currentCategory !== "all"
                                        ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20"
                                        : "bg-white border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-charcoal)]"
                                )}
                            >
                                <Filter className={cn("w-4 h-4", currentCategory !== "all" ? "text-white" : "text-[var(--color-primary)]")} />
                                <span className="capitalize">
                                    {currentCategory === "all" ? "All Topics" : currentCategory}
                                </span>
                                <ChevronDown className={cn(
                                    "w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180",
                                    currentCategory !== "all" ? "text-white/70" : "text-[var(--color-muted-foreground)]"
                                )} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-[var(--color-border)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                            <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted-foreground)]">Browse Categories</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[var(--color-border)]/50" />

                            <DropdownMenuItem
                                onClick={() => updateFilters({ category: "all" })}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
                                    currentCategory === "all" ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold" : "text-[var(--color-charcoal)] hover:bg-[var(--color-secondary)]/50"
                                )}
                            >
                                All Topics
                                {currentCategory === "all" && <Check className="w-4 h-4" />}
                            </DropdownMenuItem>

                            {categories.map((cat) => (
                                <DropdownMenuItem
                                    key={cat}
                                    onClick={() => updateFilters({ category: cat })}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors capitalize",
                                        currentCategory === cat ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold" : "text-[var(--color-charcoal)] hover:bg-[var(--color-secondary)]/50"
                                    )}
                                >
                                    {cat}
                                    {currentCategory === cat && <Check className="w-4 h-4" />}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Active Filters Summary */}
            {(currentSearch || currentCategory !== "all") && (
                <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-in">
                    <span className="text-sm font-medium text-[var(--color-muted-foreground)]">Active filters:</span>
                    {currentSearch && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[var(--color-primary)] rounded-full text-xs font-semibold border border-[var(--color-primary)]/20 shadow-sm">
                            <span className="text-[var(--color-muted-foreground)] font-normal"></span> "{currentSearch}"
                            <button onClick={() => updateFilters({ search: null })} className="hover:text-[var(--color-charcoal)] ml-1 transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    )}
                    {currentCategory !== "all" && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[var(--color-accent)] rounded-full text-xs font-semibold border border-[var(--color-accent)]/20 shadow-sm capitalize">
                            <span className="text-[var(--color-muted-foreground)] font-normal">Topic:</span> {currentCategory}
                            <button onClick={() => updateFilters({ category: null })} className="hover:text-[var(--color-charcoal)] ml-1 transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={() => updateFilters({ search: null, category: null })}
                        className="text-xs text-[var(--color-primary)] hover:text-[var(--color-charcoal)] font-bold transition-colors ml-2 uppercase tracking-tight py-1.5"
                    >
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
}
