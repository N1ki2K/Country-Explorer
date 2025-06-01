
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Languages, DollarSign, Globe, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCountries } from "@/services/countriesApi";
import Navbar from "@/components/Navbar";

const CountryDetail = () => {
  const { code } = useParams();
  
  const { data: countries = [], isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
  
  const country = countries.find(c => c.code === code);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h1 className="text-xl font-semibold text-gray-600">Loading country details...</h1>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Country Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <Navbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Country Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
            <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 flex items-center justify-center">
              <span className="text-9xl drop-shadow-lg">{country.emoji}</span>
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  {country.continent.name}
                </Badge>
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {country.name}
              </h1>
              <p className="text-xl text-gray-600">
                Discover the fascinating details about {country.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>Capital City</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">{country.capital || "No capital"}</p>
              <p className="text-gray-600 mt-1">The political and administrative center</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Currency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-800">{country.currency || "No currency data"}</p>
              <p className="text-gray-600 mt-1">Official monetary unit</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Languages className="w-5 h-5 text-purple-500" />
                <span>Languages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {country.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                    {language.name}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-600 mt-3">
                {country.languages.length === 1 
                  ? "The official language spoken in this country"
                  : "The official languages spoken in this country"
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl">Country Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {country.name} is located in {country.continent.name} with its capital in {country.capital || "an undisclosed location"}. 
              {country.currency && ` The country uses ${country.currency} as its official currency.`}
              {country.languages.length === 1 
                ? ` The official language is ${country.languages[0].name}.`
                : ` The official languages include ${country.languages.map(l => l.name).join(", ")}.`
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CountryDetail;
