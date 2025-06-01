
import { Link } from "react-router-dom";
import { MapPin, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
  currency: string;
  emoji: string;
}

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  return (
    <Link to={`/country/${country.code}`}>
      <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-blue-400 to-green-400 dark:from-blue-600 dark:to-green-600 flex items-center justify-center">
            <span className="text-6xl">{country.emoji}</span>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
            {country.continent.name}
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {country.name}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span>{country.capital || "No capital"}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span>{country.languages.length} languages</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Click to explore →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
