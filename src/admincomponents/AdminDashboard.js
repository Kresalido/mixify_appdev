// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './AdminDashboard.css';
// eslint-disable-next-line no-unused-vars
import songsImage from './images/songs.png';
// eslint-disable-next-line no-unused-vars
import podcastImage from './images/podcast.png';
// eslint-disable-next-line no-unused-vars
import videocastImage from './images/videocast.png';

function AdminDashboard() {
    useEffect(() => {
        // Data for the pie chart
        const data = {
            datasets: [{
                data: [451523, 61120, 85963],
                backgroundColor: ['#B90404', '#FF8A00', '#FAFF00'], // Updated colors
                borderWidth: 0 // Remove borders
            }]
        };

        // Options for the pie chart
        const options = {
            responsive: true
        };

        // Get the canvas element
        const ctx = document.getElementById('myPieChart');

        // Check if ctx is not null before creating the chart
        if (ctx) {
            // Check if there's an existing chart instance
            if (ctx.chart) {
                // Destroy the existing chart
                ctx.chart.destroy();
            }

            // Create the pie chart
            ctx.chart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: options
            });
        }
    }, []);

    return (
      <div>
      <div className="artist-dashboard">
          <div className="sidebar">
              <div className="admin-name">Admin</div>
              <ul>
                  <li>Category</li>
                  <li><a href="/artist-dashboard">Artist Dashboard</a></li>
                  <li>Listener's Page</li>
                  <li>Statistic Report</li>
                  <li>Subscription</li>
                  <li>Disabled Accounts</li>
                  <li>Help</li>
              </ul>
          </div>
      </div>
      <div className="col-md-10 main-container">
            <div className="dashboard-section-3 custom-dashboard-section">
                <h2 className="custom-h2">Dashboard</h2>
                    <div className="list">
                        <div className="item">
                            
                            <div className="item-info">
                                <div className="number">
                                    <h4>451,523</h4>
                                </div>
                                <div>
                                    <p>Total Songs</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                        
                            <div className="item-info">
                                <div className="number">
                                    <h4>61,120</h4>
                                </div>
                                <div>
                                    <p>Podcast</p>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                       
                            <div className="item-info">
                                <div className="number">
                                    <h4>85,963</h4>
                                </div>
                                <div>
                                    <p>Videocast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 main-container">
                    <div className="dashboard-section-3 custom-dashboard-section">
                        <div className="list">
                            {/* New items */}
                            <div className="item">
                                <div className="item-info">
                                    <div className="number">
                                        <h4>1,420,069</h4>
                                    </div>
                                    <div>
                                        <p>Active Monthly Listener</p>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-info">
                                    <div className="number">
                                        <h4>8,142,201</h4>
                                    </div>
                                    <div>
                                        <p>Registered Users</p>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="item-info">
                                    <div className="number">
                                        <h4>666,142</h4>
                                    </div>
                                    <div>
                                        <p>Monthly Guest Users</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-section-3">
                    <div className="list">
                        <div style={{ }}>
                            <div className="pie-chart-container" style={{ backgroundColor: '#d9d9d9', padding: '20px', marginLeft:'270px', borderRadius: '10px' }}>
                                <h4 style={{ color: 'black', fontSize: '20px', whiteSpace: 'nowrap', marginBottom: '10px', marginLeft:'25px' }}>Monthly Content Upload</h4>
                                <canvas id="myPieChart" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    );
}
export default AdminDashboard;