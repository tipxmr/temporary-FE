{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-17_x
    bashInteractive
  ];
  shellHook = ''
    export BROWSER=none
  '';
}
