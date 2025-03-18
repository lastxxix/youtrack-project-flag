import Island from "@jetbrains/ring-ui-built/components/island/island";
import Text from "@jetbrains/ring-ui-built/components/text/text";
const ProjectHeader = () => {
    return (
        <Island style={{ marginBottom: "24px", padding: "24px", textAlign: "center" }}>
            <Text>
                Enable/Disable test management flag for the projects.
            </Text>
        </Island>
    );
};

export default ProjectHeader;