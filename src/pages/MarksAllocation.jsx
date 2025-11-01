import React, { useState, useEffect } from "react";
import axios from "axios";

const MarksAllocation = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const res = await axios.get("https://mahatvabackend.onrender.com/api/registrations");
    setTeams(res.data);
  };

  const handleMarks = async (id, marks) => {
    await axios.post(`http://localhost:5000/api/marks/${id}`, { marks });
    fetchTeams();
  };

  return (
    <div className="marks-page">
      <h2>Marks Allocation</h2>
      {teams.map((team) => (
        <div key={team._id} className="team-box">
          <h4>{team.students} - {team.club}</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const marks = [
                e.target.round1.value,
                e.target.round2.value,
                e.target.round3.value,
                e.target.round4.value,
                e.target.round5.value,
              ].map(Number);
              handleMarks(team._id, marks);
            }}
          >
            <input name="round1" placeholder="Round 1" type="number" />
            <input name="round2" placeholder="Round 2" type="number" />
            <input name="round3" placeholder="Round 3" type="number" />
            <input name="round4" placeholder="Round 4" type="number" />
            <input name="round5" placeholder="Round 5" type="number" />
            <button type="submit">Allocate</button>
          </form>
        </div>
      ))}

      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Club</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {teams
            .sort((a, b) => b.totalMarks - a.totalMarks)
            .map((t) => (
              <tr key={t._id}>
                <td>{t.students}</td>
                <td>{t.club}</td>
                <td>{t.totalMarks ?? 0}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksAllocation;
