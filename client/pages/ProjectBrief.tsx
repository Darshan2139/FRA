import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";

export default function ProjectBrief() {
  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2">
        <BackButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            Project Brief: FRA Atlas – Digital Platform for Claims, Assets &
            Schemes
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <h3>Overview</h3>
          <p>
            This project provides a centralized digital platform for managing
            Forest Rights Act (FRA) claims, mapping village-level resources, and
            supporting government schemes with AI-powered decision-making. It
            improves efficiency, transparency, and accessibility for government
            officials, NGOs, and the public.
          </p>

          <h3>Objectives</h3>
          <ul>
            <li>
              Digitize scattered and paper-based FRA claim documents into a
              structured, searchable system.
            </li>
            <li>
              Provide an FRA Atlas with interactive GIS maps showing claims,
              boundaries, and assets.
            </li>
            <li>
              Use AI and satellite imagery to map village resources (farms,
              water bodies, forests, homesteads).
            </li>
            <li>
              Enable decision support by recommending suitable schemes for FRA
              villages.
            </li>
            <li>
              Improve monitoring, reporting, and policy planning through
              analytics dashboards.
            </li>
          </ul>

          <h3>Scope</h3>
          <ul>
            <li>Data Digitization: OCR + NER pipeline for claim forms.</li>
            <li>
              FRA Atlas (WebGIS): Map-based dashboard with claims and resources.
            </li>
            <li>
              AI-based Asset Mapping: Remote sensing and ML models for
              land/water/forest detection.
            </li>
            <li>
              Decision Support System (DSS): Recommender for scheme
              prioritization.
            </li>
            <li>
              Analytics & Reports: Charts, statistics, and exportable reports
              (CSV/PDF/Excel).
            </li>
          </ul>

          <h3>Deliverables</h3>
          <ul>
            <li>Centralized FRA digital database (claims + assets).</li>
            <li>WebGIS portal (interactive FRA Atlas).</li>
            <li>AI asset detection models and map layers.</li>
            <li>Rule-based + ML-driven Decision Support System.</li>
            <li>Analytics dashboard with export features.</li>
            <li>
              Reports and documentation for training and onboarding government
              officers.
            </li>
          </ul>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => window.print()}>Download as PDF</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
