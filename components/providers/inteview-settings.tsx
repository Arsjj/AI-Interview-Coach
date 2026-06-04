'use client'

import { InterviewLevel, InterviewMode, InterviewTopic } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type SettingsContextType = {
    topic: InterviewTopic;
    level: InterviewLevel;
    mode: InterviewMode;
    setTopic: React.Dispatch<React.SetStateAction<InterviewTopic>>;
    setLevel: React.Dispatch<React.SetStateAction<InterviewLevel>>;
    setMode: React.Dispatch<React.SetStateAction<InterviewMode>>;
};

const SettingContext = createContext<SettingsContextType | null>(null)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [topic, setTopic] = useState<InterviewTopic>("React");
    const [level, setLevel] = useState<InterviewLevel>("senior");
    const [mode, setMode] = useState<InterviewMode>("practice");

    return <SettingContext.Provider value={{ mode, topic, level, setMode, setTopic, setLevel }}>
        {children}
    </SettingContext.Provider>
}

export const useInterviewSettings = () => {
    const context = useContext(SettingContext)

    if (!context) {
        throw new Error("useSettings must be used inside SettingsProvider");
    }

    return context
}



