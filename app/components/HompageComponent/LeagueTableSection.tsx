"use client";

import leagueTable from "@/app/pages/Home/home.data";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const LeagueTableSection = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* League Table Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-2 h-12 bg-cyan-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">League Table</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Pos</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Club</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">P</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">W</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">D</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">L</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {leagueTable.map((team, index) => (
                    <tr 
                      key={index}
                      className={`
                        border-b border-gray-100 hover:bg-gray-50 transition-colors
                        ${index < 4 ? 'bg-green-50' : ''}
                        ${index > leagueTable.length - 4 ? 'bg-red-50' : ''}
                      `}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">
                        {team.position}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src="/badge/barcelona.png"
                            height={32}
                            width={32}
                            alt="team badge"
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Team {team.position}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{team.played}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{team.won}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{team.draw}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-600">{team.lost}</td>
                      <td className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              <span className="text-cyan-500 font-semibold text-lg">Our Story</span>
              <h2 className="text-4xl font-bold text-gray-800">SLFA STORY</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full"></div>
              
              <div className="space-y-6 mt-6">
                <div className="prose text-gray-600">
                  <p className="mb-4">
                    The Sierra Leone Football Association (SLFA) is the governing body
                    for football in Sierra Leone and has a history that dates back to
                    the 1920s:
                  </p>
                  
                  <div className="space-y-2">
                    {[
                      { year: "1923", event: "The Sierra Leone Football League (SLFL) is founded" },
                      { year: "1926", event: "The SLFL is renamed the Sierra Leone Amateur Football Association (SLAFA)" },
                      { year: "1960", event: "The current SLFA is established and affiliated with FIFA" },
                      { year: "1967", event: "The SLAFA is refounded" },
                      { year: "1992", event: "The SLAFA is renamed the Sierra Leone Football Association (SLFA)" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <span className="font-semibold text-cyan-500 min-w-[4rem]">{item.year}</span>
                        <p className="text-gray-600">{item.event}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6">
                    The SLFA is responsible for managing and administering football in
                    Sierra Leone, including organizing competitions and running the
                    national football teams. The SLFA is a member of the West African
                    Football Union (WAFU), Confederation of African Football (CAF), and
                    FIFA.
                  </p>

                  <p className="mt-4">
                    The SLFA&apos;s goals include improving the game of football,
                    regulating it, and promoting its unifying, educational, cultural,
                    and humanitarian values. The SLFA does this through youth and
                    development programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueTableSection;