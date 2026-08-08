/// <reference types="node" />

export default class ENV{
public static BASE_URL: string = process.env.BASE_URL ?? '';
public static ENV: string = process.env.ENV ?? '';
public static UN: string = process.env.UN ?? '';
public static PW: string = process.env.PW ?? '';

}