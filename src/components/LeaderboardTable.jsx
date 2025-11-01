import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const LeaderboardTable = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
    // Refresh leaderboard every 10 seconds (optional)
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/registrations/leaderboard");
      setLeaderboard(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Event Leaderboard 🏆</h2>

      {leaderboard.length === 0 ? (
        <p className="no-data">No teams registered yet.</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Reg. ID</th>
              <th>College Name</th>
              <th>Event</th>
              <th>Round 1</th>
              <th>Round 2</th>
              <th>Round 3</th>
              <th>Round 4</th>
              <th>Round 5</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, index) => (
              <tr key={team._id}>
                <td>{index + 1}</td>
                <td>{team.registrationId}</td>
                <td>{team.collegeName || team.college}</td>
                <td>{team.eventName || team.club}</td>
                <td>{team.marks?.round1 || team.marks?.[0] || 0}</td>
                <td>{team.marks?.round2 || team.marks?.[1] || 0}</td>
                <td>{team.marks?.round3 || team.marks?.[2] || 0}</td>
                <td>{team.marks?.round4 || team.marks?.[3] || 0}</td>
                <td>{team.marks?.round5 || team.marks?.[4] || 0}</td>
                <td className="total">{team.totalMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardTable;
