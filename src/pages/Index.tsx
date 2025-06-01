
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Globe, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CountryCard from "@/components/CountryCard";
import { fetchCountries } from "@/services/countriesApi";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const { data: countries = [], isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  const continents = useMemo(() => {
    const uniqueContinents = [...new Set(countries.map(country => country.continent.name))];
    return ["all", ...uniqueContinents.sort()];
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesContinent = selectedContinent === "all" || country.continent.name === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [countries, searchTerm, selectedContinent]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Globe className="w-16 h-16 text-red-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Failed to load countries</h1>
          <p className="text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Discover the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> World</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore detailed information about countries from every continent. Learn about cultures, languages, currencies, and more.
          </p>
          
          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-blue-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <Select value={selectedContinent} onValueChange={setSelectedContinent} disabled={isLoading}>
                    <SelectTrigger className="w-full md:w-48 h-12 pl-12 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Filter by continent" />
                    </SelectTrigger>
                    <SelectContent>
                      {continents.map(continent => (
                        <SelectItem key={continent} value={continent}>
                          {continent === "all" ? "All Continents" : continent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="pb-20 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Loading countries...</h3>
              <p className="text-gray-500 dark:text-gray-400">Please wait while we fetch the latest data</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {filteredCountries.length} Countries Found
                </h3>
                {selectedContinent !== "all" && (
                  <p className="text-gray-600 dark:text-gray-300">Showing countries from {selectedContinent}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
              
              {filteredCountries.length === 0 && !isLoading && (
                <div className="text-center py-20">
                  <Globe className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No countries found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
