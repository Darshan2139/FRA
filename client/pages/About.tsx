import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "./components/Timeline";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-extrabold">About FRA Atlas & WebGIS DSS</h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">
        Our mission is to streamline the Forest Rights Act (FRA) implementation through secure digitization, AI-powered asset mapping, and a decision support system that brings transparency and speed to claim processing.
      </p>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Empower government stakeholders with a unified, accessible, and actionable view of FRA claims and linked schemes.
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Background</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Fragmented records across departments</li>
              <li>Manual verification and limited GIS linkage</li>
              <li>Low visibility on scheme coverage and progress</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Solution Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <Badge variant="outline">OCR</Badge> <span>Digitize documents and extract fields</span><br />
            <Badge variant="outline">AI Asset Mapping</Badge> <span>Detect assets with confidence scores</span><br />
            <Badge variant="outline">WebGIS</Badge> <span>Interactive layers and spatial analytics</span><br />
            <Badge variant="outline">DSS</Badge> <span>Rule-based scheme recommendations</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project States</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-x-2">
            <Badge>Madhya Pradesh</Badge>
            <Badge>Tripura</Badge>
            <Badge>Odisha</Badge>
            <Badge>Telangana</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Download</CardTitle>
            <Button size="sm" aria-label="Download Project Brief">Project Brief (PDF)</Button>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A concise overview of objectives, scope, and deliverables.
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-xl font-bold mb-4">Timeline</h2>
        <Timeline />
      </section>
    </main>
  );
}
