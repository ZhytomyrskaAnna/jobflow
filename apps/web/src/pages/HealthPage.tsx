import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import { type HealthResponse } from "../types/health";

export function HealthPage(){

    const [health,setHealth]= useState<HealthResponse | null>(null);
    const [error,setError]=useState<string | null>(null);
    
    useEffect(()=>{
        getHealth()
            .then(setHealth)
            .catch((err:Error)=>{
                setError(err.message);
            });
    },[]);

    return(
        <main>
            <h1>Health</h1>
            
            {health && (
                <div>
                    <p>API: {health.status}</p>
                    <p>Database: {health.database}</p>
                </div>
            )}

            {error && <p>Error: {error}</p>}
        </main>
    );
}