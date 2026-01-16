// src/services/ghl-data.ts
'use server';

export interface Lead {
    id: string;
    name: string;
    email: string;
    status: 'New' | 'Won' | 'Lost' | 'Open' | 'Contacted';
    date: string;
}

export interface RevenuePoint {
    date: string;
    value: number;
}

export interface KPIMetric {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: 'Users' | 'TrendingUp' | 'Briefcase' | 'DollarSign';
}

export interface DashboardData {
    kpis: KPIMetric[];
    revenue: RevenuePoint[];
    recentLeads: Lead[];
}

export async function fetchDashboardData(): Promise<DashboardData> {
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const LOCATION_ID = process.env.GHL_LOCATION_ID;

    // console.log('--- fetchDashboardData Debug ---');
    // console.log('API Key present:', !!GHL_API_KEY);
    // console.log('Location ID:', LOCATION_ID);

    // If no key is present, fallback to mock data
    if (!GHL_API_KEY) {
        console.warn('No GHL_API_KEY found in process.env. Returning mock data.');
        return getMockData();
    }

    try {
        // Strategy 1: Try V2 API (services.leadconnectorhq.com)
        // console.log('--- Attempting V2 API (services.leadconnectorhq.com) ---');

        const v2Response = await fetch(`https://services.leadconnectorhq.com/opportunities/search?locationId=${LOCATION_ID}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
                Version: "2021-07-28",
                Accept: "application/json",
            },
            next: { revalidate: 60 }
        });

        if (v2Response.ok) {
            const data = await v2Response.json();
            // console.log('V2 API Success:', JSON.stringify(data).substring(0, 200));

            const dashboardData = getMockData();
            if (data.opportunities && Array.isArray(data.opportunities)) {
                dashboardData.kpis[0].value = data.opportunities.length.toString();
                dashboardData.kpis[0].change = `+${data.opportunities.length} (Real-time V2)`;
            }
            return dashboardData;
        } else {
            const errText = await v2Response.text();
            console.warn(`V2 API Failed: Status ${v2Response.status} ${v2Response.statusText}`);
            console.warn(`V2 Error Body: ${errText}`);
        }

        // Strategy 2: Fallback to V1 API (rest.gohighlevel.com)
        console.log('--- Attempting V1 API Fallback (rest.gohighlevel.com) ---');
        const v1Response = await fetch(`https://rest.gohighlevel.com/v1/pipelines?location_id=${LOCATION_ID}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${GHL_API_KEY}`,
            },
            next: { revalidate: 60 }
        });

        if (v1Response.ok) {
            const data = await v1Response.json();
            // console.log('V1 API Success:', JSON.stringify(data).substring(0, 200));

            // V1 connection confirmed. Return mock data for now as structure differs.
            const dashboardData = getMockData();
            dashboardData.kpis[0].change = "Connected (V1)";
            return dashboardData;
        } else {
            const errText = await v1Response.text();
            console.error(`V1 API Failed: Status ${v1Response.status} ${v1Response.statusText}`);
            console.error(`V1 Error Body: ${errText}`);
        }

        console.warn('All API attempts failed. Returning mock data.');
        return getMockData();

    } catch (error) {
        console.error("GHL API Fatal Error:", error);
        return getMockData();
    }
}

function getMockData(): DashboardData {
    return {
        kpis: [
            { title: 'Total Leads', value: '1,234', change: '+12%', trend: 'up', icon: 'Users' },
            { title: 'Conversion Rate', value: '15.3%', change: '+2.1%', trend: 'up', icon: 'TrendingUp' },
            { title: 'Open Opportunities', value: '45', change: '-5', trend: 'down', icon: 'Briefcase' },
            { title: 'Pipeline Value', value: '$124,500', change: '+$12k', trend: 'up', icon: 'DollarSign' },
        ],
        revenue: [
            { date: 'Sep 01', value: 4000 },
            { date: 'Sep 05', value: 3000 },
            { date: 'Sep 10', value: 5000 },
            { date: 'Sep 15', value: 7800 },
            { date: 'Sep 20', value: 6500 },
            { date: 'Sep 25', value: 9000 },
            { date: 'Sep 30', value: 12000 },
        ],
        recentLeads: [
            { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'New', date: '2023-10-01' },
            { id: '2', name: 'Bob Smith', email: 'bob@enterprise.com', status: 'Won', date: '2023-09-29' },
            { id: '3', name: 'Charlie Davis', email: 'charlie@startup.io', status: 'Contacted', date: '2023-09-28' },
            { id: '4', name: 'Diana Prince', email: 'diana@agency.com', status: 'Open', date: '2023-09-27' },
            { id: '5', name: 'Evan Wright', email: 'evan@freelance.net', status: 'Lost', date: '2023-09-26' },
        ]
    };
}