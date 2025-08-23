import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const EU_COUNTRIES = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR",
  "HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK",
  "SI","ES","SE"
]);

const Prices = () => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        console.log("User country:", data.country_code); 
        setCountry(data.country_code);
      })
      .catch((err) => console.error("Error fetching location:", err));
  }, []);

  let pricing;
  if (country === "IN") {
    pricing = {
      basic: "₹7,900 / mo",
      startup: "₹12,999 / mo",
      vip: "₹17,999 / mo",
    };
  } else if (EU_COUNTRIES.has(country)) {
    pricing = {
      basic: "€99 / mo",
      startup: "€149 / mo",
      vip: "€199 / mo",
    };
  } else {
    pricing = {
      basic: "$99 / mo",
      startup: "$149 / mo",
      vip: "$199 / mo",
    };
  }

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that Scales with You
          </h1>
          <p>
            The prices mentioned below are estimates and can be tailored according to your
            needs, so feel free to reach out.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {/* Basic */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Basic</CardTitle>
              <span className="my-3 block text-2xl font-semibold">{pricing.basic}</span>
              <CardDescription className="text-sm">Customizable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {["8 Graphic Posts", "2 Reel/Shorts", "Stories (2-3 per week)", "Content Writing", "Organic Growth", "Optimization"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link to="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* VIP */}
          <Card className="relative">
            <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Value
            </span>
            <div className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-medium">VIP</CardTitle>
                <span className="my-3 block text-2xl font-semibold">{pricing.vip}</span>
                <CardDescription className="text-sm">Customizable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                  {["20 Graphic Posts", "6 Reel/Shorts", "4 UGC Videos", "Daily Stories", "Content Writing", "Organic Growth", "Optimisation"].map(
                    (item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="size-3" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full mt-10">
                  <Link to="">Get Started</Link>
                </Button>
              </CardFooter>
            </div>
          </Card>

          {/* Startup */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Startup</CardTitle>
              <span className="my-3 block text-2xl font-semibold">{pricing.startup}</span>
              <CardDescription className="text-sm">Customizable</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {["12 Graphic Posts", "4 Reel/Shorts", "2 UGC Videos", "Stories (4-5 per week)", "Content Writing", "Organic Growth", "Optimisation"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link to="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Prices;
