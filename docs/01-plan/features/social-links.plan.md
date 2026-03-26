---
name: social-links
description: 메인 페이지 하단 소셜 미디어 아이콘 링크 추가
status: in-progress
created: 2026-03-26T02:02:04Z
updated: 2026-03-26T02:02:04Z
---

## Executive Summary

| 관점 | 내용 |
|------|------|
| **Problem** | 소셜 미디어/쇼핑몰로의 유입 경로가 없음 |
| **Solution** | TestSelectPage 하단에 유튜브, 인스타, 스레드, 쇼핑몰 아이콘 링크 추가 |
| **Function UX Effect** | 아이콘 클릭 → 새 탭에서 외부 링크 열림 |
| **Core Value** | 소셜 채널 유입 + 쇼핑몰 트래픽 연결 |

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 소셜/쇼핑몰 채널로 사용자 유도 |
| **WHO** | 테스트 방문자 |
| **RISK** | 낮음 (UI 추가만) |
| **SUCCESS** | 4개 아이콘 표시 + 클릭 시 새 탭 열림 |
| **SCOPE** | TestSelectPage.tsx 수정 1개 파일 |

## Requirements

| ID | 요구사항 | 우선순위 |
|----|----------|----------|
| FR-01 | 유튜브 아이콘 + 링크 | Must |
| FR-02 | 인스타그램 아이콘 + 링크 | Must |
| FR-03 | 스레드 아이콘 + 링크 | Must |
| FR-04 | 쇼핑몰 아이콘 + 링크 | Must |
| FR-05 | 새 탭에서 열기 (target="_blank") | Must |
| FR-06 | 링크 URL은 추후 교체 가능 | Should |
