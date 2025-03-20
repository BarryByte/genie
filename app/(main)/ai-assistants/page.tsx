"use client";
import AiAssistantsList from "@/app/services/AiAssistantsList";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";

import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AiAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);

  const insertAssistant = useMutation(
    api.userAiAssistants.InsertSelectedAssistants
  );
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    user && GetUserAssistants();
  }, [user]);
  const GetUserAssistants = async () => {
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user?._id,
      }
    );
    console.log(result);
    if (result.length > 0) {
      router.replace("/workspace");
      return;
    }
  };

  const onSelect = (assistant: ASSISTANT) => {
    const item =
      assistant &&
      selectedAssistant.find((item: ASSISTANT) => item.id === assistant.id);
    if (item) {
      setSelectedAssistant(
        selectedAssistant.filter((item: ASSISTANT) => item.id !== assistant.id)
      );
      return;
    } else {
      setSelectedAssistant([...selectedAssistant, assistant]);
    }
  };

  const IsAssistantSelected = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find(
      (item: ASSISTANT) => item.id === assistant.id
    );
    return item ? true : false;
  };
  const OnClickContinue = async () => {
    setLoading(true);
    console.log("User ID:", user?.id);

    const result = await insertAssistant({
      records: selectedAssistant,
      uid: user?._id,
    });
    setLoading(false);
    console.log(result);
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className=" flex justify-between item-center p-3">
        <div>
          <BlurFade delay={0.25 * 1 * 0.05} inView>
            <h2 className="text-4xl font-bold ">
              Welcome to the world of <AuroraText> AI assistants</AuroraText>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2 * 0.05} inView>
            <p className="text-3xl">Choose one that suits your task</p>
          </BlurFade>
        </div>
        <Button
          disabled={selectedAssistant?.length == 0 || loading}
          className="font-mono"
          onClick={OnClickContinue}
        >
          {loading && <Loader2Icon className="animate-spin" />}Continue
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 mb-14">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={index} delay={0.25 + index * 0.05} inView>
            <div
              className="hover:border p-3 hover:rounded-2xl hover:scale-105  transition-all ease-in-out cursor-pointer relative"
              onClick={() => onSelect(assistant)}
              key={assistant.id}
            >
              <Checkbox
                className="absolute m-2 "
                checked={IsAssistantSelected(assistant)}
              />
              <Image
                key={index}
                src={assistant.image}
                alt={assistant.title}
                height={600}
                width={600}
                className="rounded-xl w-fill h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg ">
                {assistant.name}
              </h2>
              <h2 className="text-center font-extralight ">
                {assistant.title}
              </h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AiAssistants;
