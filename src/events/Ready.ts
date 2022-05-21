import { Base } from './deps.ts'
import { GatewayReadyDispatchData } from '../types/mod.ts'
export function GatewayReadyEventHandler(data: GatewayReadyDispatchData, client: Base) {
    client.user = {
        ...data.user as any,
        guilds: data.guilds.map(
            (g: { id: string; unavailable: boolean }) =>
                g.id
        ),
    }
}