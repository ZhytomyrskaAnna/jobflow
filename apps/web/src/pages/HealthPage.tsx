import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import { type HealthResponse } from "../types/health";

export function HealthPage(){

    const [health,setHealth]= useState<HealthResponse | null>(null);
    const [error,setError]=useState<string | null>(null);
    const [loading,setLoading]=useState(true);
    
    useEffect(()=>{
        async function CheckHealth() {
            try{
                setLoading(true);
                setError(null);

                const response = await getHealth();

                setHealth(response);
            } catch{
                setHealth(null);
                setError('Unable to connect to the backend.');
            } finally{
                setLoading(false);
            }
        }

        void CheckHealth();
    },[]);

    if (loading){
        return(
            <main>
                <h1>System Health</h1>
                <p>Checking system status...</p>
            </main>
        );
    }

    if (error){
        return(
            <main>
                <h1>System Health</h1>
                <p>API: Uvailable</p>
                <p>Database: Unknown</p>

                <p>{error}</p>
            </main>
        );
    }

    return(
        <main>
            <h1>System Health</h1>

            <p>
                API:{' '}
                {health?.status === 'ok' ? '✅ Connected' : '❌ Error'}
            </p>

            <p>
                Database:{' '}
                {health?.database === 'up' ? '✅ Connected' : '❌ Error'}
            </p>
        </main>
    );
}