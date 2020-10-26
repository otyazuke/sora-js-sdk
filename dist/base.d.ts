import { Callbacks, ConnectionOptions, Json, SignalingOfferMessage, SignalingUpdateMessage } from "./types";
import SoraE2EE from "sora-e2ee";
export default class ConnectionBase {
    role: string;
    channelId: string;
    metadata: Json;
    signalingUrl: string;
    options: ConnectionOptions;
    constraints: any;
    debug: boolean;
    clientId: string | null;
    connectionId: string | null;
    remoteConnectionIds: string[];
    stream: MediaStream | null;
    authMetadata: Json;
    pc: RTCPeerConnection | null;
    protected ws: WebSocket | null;
    protected callbacks: Callbacks;
    protected e2ee: SoraE2EE | null;
    constructor(signalingUrl: string, role: string, channelId: string, metadata: Json, options: ConnectionOptions, debug: boolean);
    on(kind: keyof Callbacks, callback: Function): void;
    disconnect(): Promise<[void, void, void]>;
    protected startE2EE(): void;
    protected signaling(offer: RTCSessionDescriptionInit): Promise<SignalingOfferMessage>;
    protected createOffer(): Promise<RTCSessionDescriptionInit>;
    protected connectPeerConnection(message: SignalingOfferMessage): Promise<void>;
    protected setRemoteDescription(message: SignalingOfferMessage | SignalingUpdateMessage): Promise<void>;
    protected createAnswer(message: SignalingOfferMessage | SignalingUpdateMessage): Promise<void>;
    protected sendAnswer(): void;
    protected sendUpdateAnswer(): void;
    protected onIceCandidate(): Promise<void>;
    protected waitChangeConnectionStateConnected(): Promise<void>;
    protected setConnectionTimeout(): Promise<MediaStream>;
    protected trace(title: string, message: any): void;
    private update;
    private setSenderParameters;
    private getStats;
}
