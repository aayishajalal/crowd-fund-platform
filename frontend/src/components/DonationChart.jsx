import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const DonationChart = ({ data }) => {
    useEffect(() => {
        if (data.length) {
            new Chart(document.getElementById("donationChart"), {
                type: "pie",
                data: {
                    labels: data.map(d => d.campaign),
                    datasets: [
                        {
                            data: data.map(d => d.amount),
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        },
                    ],
                },
            });
        }
    }, [data]);

    return <canvas id="donationChart"></canvas>;
};

export default DonationChart;