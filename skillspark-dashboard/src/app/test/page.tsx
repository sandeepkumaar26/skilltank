import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Test Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test to verify components are working.</p>
          <Button className="mt-4">Test Button</Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary text-primary-foreground rounded">Primary</div>
        <div className="p-4 bg-secondary text-secondary-foreground rounded">Secondary</div>
        <div className="p-4 bg-accent text-accent-foreground rounded">Accent</div>
        <div className="p-4 bg-muted text-muted-foreground rounded">Muted</div>
      </div>
    </div>
  );
}