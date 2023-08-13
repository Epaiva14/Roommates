import Layout from "../components/layout";
import ChoreCard from "./ChoreCard";
import { useState, useEffect } from "react";


export default function Chores() {

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <Layout />
            <div className="columns">
                <div className="column" key={chore._id}>
                    <ChoreCard chore={chore} />
                </div>

            </div>
        </>
    );

}





