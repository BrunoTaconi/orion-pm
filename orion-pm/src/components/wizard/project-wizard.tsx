import { useState } from "react";
import Modal from "../ui/modal";
import IntroStep from "./steps/intro-step";
import ExplanationStep from "./steps/explanation-step"; // <-- Importe o novo step aqui
import ProjectProfileStep from "./steps/project-profile-step";
import TeamStep from "./steps/team-step";
import { RequirementsStep } from "./steps/requirements-step";
import RisksStep from "./steps/risks-step";
import ResultStep from "./steps/result-step";
import { calculateRecommendation } from "@/lib/modelRecommendation";

export type ProjectBaseData = {
  name: string;
  description?: string;
  teamId: string;
  deadline?: string;
  visibility: "private" | "public" | "internal";
};

export type WizardData = {
  scopeClarity?: string;
  stability?: string;
  urgency?: string;
  teamSize?: string;
  documentationLevel?: string;
  risks?: string[];
  requirementStability?: string;
  prototype?: string;
  teamAvailability?: string;
  teamExperience?: string;
  customerParticipation?: string;
  clientNeedsClarity?: string;
  requirementsType?: string;
  externalDependencies?: string;
  technicalComplexity?: string;
  newTechUse?: string;
  identifiableRisks?: string;
};

export type WizardStepBaseProps = {
  next: () => void;
  back: () => void;
};

export type WizardStepWithDataProps = WizardStepBaseProps & {
  data: WizardData;
  updateData: (values: Partial<WizardData>) => void;
};

interface ProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectWizard({ isOpen, onClose }: ProjectWizardProps) {
  const [step, setStep] = useState(0);

  const [projectData, setProjectData] = useState<ProjectBaseData>({
    name: "",
    description: "",
    teamId: "",
    visibility: "private",
  });

  const [wizardData, setWizardData] = useState<WizardData>({});

  const updateData = (values: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...values }));
  };

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const handleCreateProject = () => {
    const methodology = calculateRecommendation(wizardData);

    const newProject = {
      id: crypto.randomUUID(),
      name: projectData.name,
      description: projectData.description,
      teamId: projectData.teamId,
      deadline: projectData.deadline,
      visibility: projectData.visibility,
      methodology,
      createdAt: new Date(),
    };

    console.log("Projeto criado", newProject);

    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <IntroStep
            projectData={projectData}
            updateProjectData={(values) =>
              setProjectData((prev) => ({ ...prev, ...values }))
            }
            next={next}
            onClose={onClose}
          />
        );
      case 1:
        return <ExplanationStep next={next} back={back} />;
      case 2:
        return (
          <ProjectProfileStep
            data={wizardData}
            updateData={updateData}
            next={next}
            back={back}
          />
        );
      case 3:
        return (
          <TeamStep
            data={wizardData}
            updateData={updateData}
            next={next}
            back={back}
          />
        );
      case 4:
        return (
          <RequirementsStep
            data={wizardData}
            updateData={updateData}
            next={next}
            back={back}
          />
        );
      case 5:
        return (
          <RisksStep
            data={wizardData}
            updateData={updateData}
            next={next}
            back={back}
          />
        );
      case 6:
        return (
          <ResultStep
            data={wizardData}
            back={back}
            createProject={handleCreateProject}
          />
        );
    }
  };

  return (
    <Modal
      title="Create Project"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      titleSize="text-xl"
      padding="p-6"
      closeOnOverlayClick={false}
    >
      {renderStep()}
    </Modal>
  );
}
