import { components } from "@/lib/componentData";

export interface SelectedComponent {
  id: string;
  name: string;
}

const FALLBACK_EMPTY_CODE = "// Select components to generate code";

function toComponentIdentifier(name: string): string {
  return name.replace(/\s+/g, "");
}

export function generatePlaygroundCode(
  selectedComponents: SelectedComponent[],
): string {
  if (selectedComponents.length === 0) {
    return FALLBACK_EMPTY_CODE;
  }

  const uniqueIdentifiers = Array.from(
    new Set(
      selectedComponents.map((component) =>
        toComponentIdentifier(component.name),
      ),
    ),
  );

  const imports = uniqueIdentifiers
    .map(
      (identifier) => `import ${identifier} from '@/components/ui/${identifier}'`,
    )
    .join("\n");

  const jsx = selectedComponents
    .map((component) => {
      const matchedComponent = components.find((item) => item.id === component.id);
      return matchedComponent?.code ?? `<${toComponentIdentifier(component.name)} />`;
    })
    .join("\n\n      ");

  return `${imports}

export default function MyPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      ${jsx}
    </div>
  )
}`;
}
