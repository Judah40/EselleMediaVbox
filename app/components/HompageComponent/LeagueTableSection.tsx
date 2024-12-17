import leagueTable from "@/app/pages/Home/home.data";
import Image from "next/image";
import React from "react";

const LeagueTableSection = ({
  onClose,
}: {
  onClose: (value: boolean) => void;
}) => {
  return (
    <div className="w-full p-4 bg-white flex flex-col items-center">
      {/* table */}
      <div className="w-full p-4 flex flex-col md:flex-row">
        <div className="text-gray-700 md:w-6/12 w-full p-8">
          <div className="w-full p-4 border-l-8 border-cyan-500 border-b-4 rounded">
            <p className="text-lg font-bold ">League Table</p>
          </div>
          <table className="w-full  border rounded">
            <thead className="border">
              <tr className="flex justify-between p-2">
                <th>Pos</th>
                <th>Club</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {leagueTable.map((value, index) => (
                <tr key={index} className="flex justify-between p-2">
                  <td>{value.position}</td>
                  <td>
                    <Image
                      src={"/badge/barcelona.png"}
                      height={40}
                      width={50}
                      alt="badge"
                    />
                  </td>
                  <td>{value.played}</td>
                  <td>{value.won}</td>
                  <td>{value.draw}</td>
                  <td>{value.lost}</td>
                  <td>{value.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-6/12 p-8 text-black">
          <p className="text-xl font-bold text-cyan-500">Our Story</p>
          <p className="text-3xl font-bold ">SLFA STORY</p>
          <hr className="bg-cyan-500" />
          <p className="text-gray-500">
            The Sierra Leone Football Association (SLFA) is the governing body
            for football in Sierra Leone and has a history that dates back to
            the 1920s:
            <br />
            1923: The Sierra Leone Football League (SLFL) is founded.
            <br />
            1926: The SLFL is renamed the Sierra Leone Amateur Football
            Association (SLAFA).
            <br />
            1960: The current SLFA is established and affiliated with FIFA.
            1967: The SLAFA is refounded.
            <br />
            1992: The SLAFA is renamed the Sierra Leone Football Association
            (SLFA).
          </p>
          <p className="text-gray-500">
            The SLFA is responsible for managing and administering football in
            Sierra Leone, including organizing competitions and running the
            national football teams. The SLFA is a member of the West African
            Football Union (WAFU), Confederation of African Football (CAF), and
            FIFA.{" "}
          </p>
          <p className="text-gray-500">
            The SLFA&apos;s goals include improving the game of football,
            regulating it, and promoting its unifying, educational, cultural,
            and humanitarian values. The SLFA does this through youth and
            development programs.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeagueTableSection;
