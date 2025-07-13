"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText } from "lucide-react";
import { useState, useRef } from "react";

export default function DashboardPage({
  label,
  endpoint,
}: {
  label: string;
  endpoint: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("Upload successful");
    } else {
      console.error("Upload failed");
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>DashBoard</Breadcrumb>
        {/*<Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">ATS</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>*/}
      </header>

      <div className="flex flex-col gap-6 p-4 pt-0">
        {/* Top Section: Upload Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud size={20} /> Upload Resume
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="resumes"
                  name="resumes"
                  multiple
                  required
                  accept=".pdf,.docx,.txt"
                  onChange={handleChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={handleClick}
                >
                  Drag and drop resume here (PDF, DOCX, TXT)
                </Button>
                {fileName && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Uploaded: {fileName}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={20} /> Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <Textarea placeholder="Paste your Job description here" />
            </CardContent>
          </Card>
        </div>

        {/* Score and Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-center">78%</div>
              <Progress value={78} className="h-4" />
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Skills Matched</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <div className="bg-background p-2 rounded border">Python ✅</div>
              <div className="bg-background p-2 rounded border">Flask ✅</div>
              <div className="bg-background p-2 rounded border">Next.js ✅</div>
              <div className="bg-background p-2 rounded border">Docker ❌</div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Section */}
        <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>• Consider adding more project experience using Docker.</p>
              <p>• Add measurable results from previous roles.</p>
              <p>
                • Tailor your summary to include keywords like “API Design.”
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section: Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Clear</Button>
          <Button>Generate Report</Button>
        </div>
      </div>
    </SidebarInset>
  );
}
