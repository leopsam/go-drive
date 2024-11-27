import { StyledButton } from './styles'

export default function ButtonHistory({ onClick, children }: { onClick: () => void; children: string }) {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
}
