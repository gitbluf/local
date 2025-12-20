# LOCAL SETUP

## OCI Artifacts Workflow

The repository uses a workflow that creates OCI artifacts from the `llm/agent` and `llm/command` directories.

The workflow:
- Triggers on pushes to the main branch affecting files under `llm/`.
- Creates an OCI artifact from `llm/agent` when files under `llm/agent/` change.
- Creates an OCI artifact from `llm/command` when files under `llm/command/` change.

Artifacts are stored at:
- `oci://ghcr.io/gitbluf/local/oc-agent:{tag}`
- `oci://ghcr.io/gitbluf/local/oc-command:{tag}`

To consume the artifacts:
- Retrieve the agent artifact with `flux pull artifact oci://ghcr.io/gitbluf/local/oc-agent:{tag} --output {directory}`
- Retrieve the command artifact with `flux pull artifact oci://ghcr.io/gitbluf/local/oc-command:{tag} --output {directory}`

Where {tag} is 'main' for branch pushes or the tag name for tag pushes.
