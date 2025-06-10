document.addEventListener("DOMContentLoaded", () => {
    const events = [  
        {  
            title: "Rise & Thrive: East Africa Entrepreneurs Summit",  
            date: "September 10, 2024",  
            location: "Serena Conference Center, Kampala, Uganda",  
            time: "10:00 AM - 3:00 PM EAT"  
        },  
        {  
            title: "Innovate Kampala: Tech & Startup Forum",  
            date: "October 25, 2024",  
            location: "Innovation Village, Ntinda, Kampala",  
            time: "2:00 PM - 6:00 PM EAT"  
        },  
        {  
            title: "Beyond Profits: Small Business Mastery Workshop",  
            date: "November 18, 2024",  
            location: "Uganda Manufacturers Association Hall, Lugogo",  
            time: "9:00 AM - 1:00 PM EAT"  
        },  
        {  
            title: "Brand Boost: The Ultimate Marketing & Growth Conference",  
            date: "December 7, 2024",  
            location: "Sheraton Hotel, Kampala",  
            time: "11:00 AM - 4:00 PM EAT"  
        },  
        {  
            title: "EcoVision 2025: Uganda’s Green Business & Innovation Expo",  
            date: "January 20, 2025",  
            location: "Kampala International Conference Center",  
            time: "3:00 PM - 8:00 PM EAT"  
        },  
        {  
            title: "Leading with Impact: Women in Business & Leadership Summit",  
            date: "March 8, 2025",  
            location: "Pearl of Africa Hotel, Kampala",  
            time: "10:00 AM - 2:00 PM EAT"  
        }  
    ];  
    
    

    const eventsList = document.getElementById("events-list");

    events.forEach(event => {
        const eventItem = document.createElement("li");

        const eventTitle = document.createElement("h2");
        eventTitle.textContent = event.title;

        const eventDate = document.createElement("p");
        eventDate.textContent = `Date: ${event.date}`;

        const eventLocation = document.createElement("p");
        eventLocation.textContent = `Location: ${event.location}`;

        const eventTime = document.createElement("p");
        eventTime.textContent = `Time: ${event.time}`;

        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventDate);
        eventItem.appendChild(eventLocation);
        eventItem.appendChild(eventTime);

        eventsList.appendChild(eventItem);
    });
});